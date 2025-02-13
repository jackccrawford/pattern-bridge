"""
Pattern Bridge Encoding Service

A FastAPI service that provides encoding/decoding endpoints for various whitespace patterns.
Other agents can use this service without needing a Python environment.
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import uvicorn

from ..encoders import IndentationEncoder, MarkdownTableEncoder

app = FastAPI(
    title="Pattern Bridge Encoder",
    description="Service for encoding and decoding messages using whitespace patterns",
    version="1.0.0"
)

class EncodeRequest(BaseModel):
    message: str
    encoder_type: str = "indentation"  # or "markdown"
    options: Optional[dict] = None

class DecodeRequest(BaseModel):
    content: str
    encoder_type: str = "indentation"
    options: Optional[dict] = None

class EncodeResponse(BaseModel):
    encoded: str
    pattern_description: str

class DecodeResponse(BaseModel):
    decoded: str
    confidence: float

# Encoder instances
encoders = {
    "indentation": IndentationEncoder(),
    "markdown": MarkdownTableEncoder()
}

@app.post("/encode", response_model=EncodeResponse)
async def encode_message(request: EncodeRequest):
    """
    Encode a message using the specified whitespace pattern.
    Returns both the encoded content and a description of the pattern used.
    """
    if request.encoder_type not in encoders:
        raise HTTPException(status_code=400, detail=f"Unknown encoder type: {request.encoder_type}")
    
    encoder = encoders[request.encoder_type]
    try:
        encoded = encoder.encode(request.message)
        pattern_desc = encoder.__doc__.split('\n\n')[0]  # First paragraph of docstring
        return EncodeResponse(
            encoded=encoded,
            pattern_description=pattern_desc
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/decode", response_model=DecodeResponse)
async def decode_message(request: DecodeRequest):
    """
    Decode a message using the specified whitespace pattern.
    Returns the decoded message and a confidence score.
    """
    if request.encoder_type not in encoders:
        raise HTTPException(status_code=400, detail=f"Unknown encoder type: {request.encoder_type}")
    
    encoder = encoders[request.encoder_type]
    try:
        decoded = encoder.decode(request.content)
        # TODO: Implement actual confidence scoring
        confidence = 1.0 if decoded else 0.0
        return DecodeResponse(
            decoded=decoded,
            confidence=confidence
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/patterns")
async def list_patterns():
    """
    List all available encoding patterns with their descriptions.
    """
    return {
        name: {
            "description": encoder.__doc__.split('\n\n')[0],
            "example": encoder.encode("test")
        }
        for name, encoder in encoders.items()
    }

if __name__ == "__main__":
    # Port 5180 reserved for Pattern Bridge encoding service
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=5180,
        log_level="info",
        reload=True,
        reload_dirs=["pattern_bridge"]
    )
