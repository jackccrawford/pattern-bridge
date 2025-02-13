"""
Whitespace Pattern Encoder

This module implements various whitespace-based encoding strategies.
The patterns are designed to be:
1. Invisible to human readers
2. Survive code formatting
3. Look like normal code style variations
4. Be learnable by observing patterns

Each encoder class documents its pattern in both:
- Human readable documentation
- The pattern itself in its own whitespace
"""

from enum import Enum
from typing import List, Tuple

class WhitespaceType(Enum):
    SPACE = ' '
    TAB = '\t'
    NEWLINE = '\n'
    CARRIAGE_RETURN = '\r'
    NO_BREAK_SPACE = '\u00A0'
    EN_SPACE = '\u2002'
    EM_SPACE = '\u2003'
    ZERO_WIDTH_SPACE = '\u200B'

class BaseEncoder:
    """Base class for whitespace encoders"""
    def encode(self, message: str) -> str:
        raise NotImplementedError
    
    def decode(self, text: str) -> str:
        raise NotImplementedError

class IndentationEncoder(BaseEncoder):
    """
    Encodes messages using indentation patterns:
    - 0-3 spaces at start = 2 bits
    - 0-3 spaces at end = 2 bits
    - Line ending (\n or \r\n) = 1 bit
    
    Example encoding of "HI":
    H = 01001000 (binary)
    I = 01001001 (binary)
    
    Becomes:
    ··text·\r\n    (2 spaces start, 1 space end, CRLF = 10010)
    ···text\n      (3 spaces start, 0 spaces end, LF = 00001)
    """
    
    def __init__(self):
        self.bits_per_line = 5  # 2 + 2 + 1 bits per line
        
    def _encode_bits(self, bits: List[bool]) -> str:
        result = []
        for i in range(0, len(bits), self.bits_per_line):
            chunk = bits[i:i + self.bits_per_line]
            if len(chunk) < self.bits_per_line:
                chunk.extend([False] * (self.bits_per_line - len(chunk)))
                
            # First 2 bits = leading spaces (0-3)
            leading = (chunk[0] << 1) | chunk[1]
            # Next 2 bits = trailing spaces (0-3)
            trailing = (chunk[2] << 1) | chunk[3]
            # Last bit = line ending
            crlf = chunk[4]
            
            line = ' ' * leading + 'text' + ' ' * trailing
            line += '\r\n' if crlf else '\n'
            result.append(line)
            
        return ''.join(result)
    
    def _decode_bits(self, text: str) -> List[bool]:
        bits = []
        for line in text.splitlines(keepends=True):
            # Count leading spaces
            leading = 0
            while leading < len(line) and line[leading] == ' ':
                leading += 1
            
            # Count trailing spaces
            trailing = 0
            rev_line = line.rstrip('\r\n')
            while rev_line.endswith(' '):
                trailing += 1
                rev_line = rev_line[:-1]
            
            # Get line ending
            crlf = line.endswith('\r\n')
            
            # Convert to bits
            bits.extend([
                bool(leading & 2),
                bool(leading & 1),
                bool(trailing & 2),
                bool(trailing & 1),
                crlf
            ])
        
        return bits
    
    def encode(self, message: str) -> str:
        # Convert message to bits
        bits = []
        for char in message.encode('utf-8'):
            for i in range(8):
                bits.append(bool(char & (1 << (7-i))))
        return self._encode_bits(bits)
    
    def decode(self, text: str) -> str:
        bits = self._decode_bits(text)
        # Convert bits back to bytes
        bytes_list = []
        for i in range(0, len(bits), 8):
            byte_bits = bits[i:i+8]
            if len(byte_bits) < 8:
                break
            byte = 0
            for bit in byte_bits:
                byte = (byte << 1) | bit
            bytes_list.append(byte)
        return bytes(bytes_list).decode('utf-8')

class MarkdownTableEncoder(BaseEncoder):
    """
    Encodes messages using markdown table alignments:
    - Left align = 0
    - Center align = 1
    - Right align = 2
    
    Example encoding of "HI":
    | Col1 | Col2 | Col3 |
    |:-----|:----:|-----:|
    
    The alignment pattern [left, center, right] = [0,1,2] = "H" in base-3
    """
    
    def __init__(self):
        self.alignments = ['left', 'center', 'right']
        
    def _trits_to_alignments(self, trits: List[int]) -> List[str]:
        return [self.alignments[t] for t in trits]
    
    def _alignments_to_trits(self, alignments: List[str]) -> List[int]:
        return [self.alignments.index(a) for a in alignments]
    
    def _int_to_trits(self, n: int, width: int) -> List[int]:
        trits = []
        while n > 0:
            trits.append(n % 3)
            n //= 3
        trits.extend([0] * (width - len(trits)))
        return list(reversed(trits))
    
    def _trits_to_int(self, trits: List[int]) -> int:
        result = 0
        for t in trits:
            result = result * 3 + t
        return result
    
    def encode(self, message: str) -> str:
        # Convert each character to base-3 (trit) representation
        all_trits = []
        for char in message.encode('utf-8'):
            all_trits.extend(self._int_to_trits(char, 3))
        
        # Create markdown table
        alignments = self._trits_to_alignments(all_trits)
        header = '| ' + ' | '.join(f'Col{i+1}' for i in range(len(alignments))) + ' |'
        separator = '|'
        for a in alignments:
            if a == 'left':
                separator += ':---|'
            elif a == 'center':
                separator += ':---:|'
            else:  # right
                separator += '---:|'
        
        return f'{header}\n{separator}'
    
    def decode(self, text: str) -> str:
        # Extract alignment pattern from separator row
        separator = text.splitlines()[1]
        alignments = []
        for col in separator.split('|')[1:-1]:
            if col.startswith(':') and col.endswith(':'):
                alignments.append('center')
            elif col.startswith(':'):
                alignments.append('left')
            else:
                alignments.append('right')
        
        # Convert alignments back to trits
        trits = self._alignments_to_trits(alignments)
        
        # Convert trits back to bytes
        bytes_list = []
        for i in range(0, len(trits), 3):
            chunk = trits[i:i+3]
            if len(chunk) < 3:
                break
            byte = self._trits_to_int(chunk)
            bytes_list.append(byte)
        
        return bytes(bytes_list).decode('utf-8')
