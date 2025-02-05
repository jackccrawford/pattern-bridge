# Flow Analysis

## Integration Architecture
```mermaid
graph TD
    subgraph Agent Flows
        Start[Entry Points]
        Flows[Flow Controllers]
        State[State Handlers]
    end
    
    subgraph Integration Layer
        W[cxPrebuiltAgentsFinServ<br/>Webhook]
        style W fill:#ddf,stroke:#666
    end
    
    subgraph External Systems
        Auth[Authentication API]
        Payment[Payment Gateway]
        Account[Account Services]
        style Auth fill:#ddf,stroke:#666
        style Payment fill:#ddf,stroke:#666
        style Account fill:#ddf,stroke:#666
    end
    
    Start --> Flows
    Flows --> State
    
    Flows -.->|"validate"| W
    State -.->|"update"| W
    
    W -.->|"auth"| Auth
    W -.->|"payment"| Payment
    W -.->|"account"| Account
```

## Integration Points

### Webhook Configuration
- **Name**: cxPrebuiltAgentsFinServ
- **Endpoint**: europe-west2-avian-mystery-295516.cloudfunctions.net
- **Timeout**: 5 seconds
- **Protocol**: HTTPS/REST

### External Systems
1. **Authentication API**
   - Purpose: Card and account verification
   - Operations: validate_card, verify_account
   - Response time: < 5s
   - Retry policy: 3 attempts

2. **Payment Gateway**
   - Purpose: Payment processing
   - Operations: process_payment, check_status
   - Response time: < 5s
   - Retry policy: 3 attempts

3. **Account Services**
   - Purpose: Account management
   - Operations: get_balance, get_transactions
   - Response time: < 5s
   - Retry policy: 2 attempts

## Default Start Flow
```mermaid
graph TD
    Start[Start] --> Welcome[Welcome Message]
    Welcome -->|"credit_card.check_balance"| Balance[Check Balance Flow]
    Welcome -->|"credit_card.make_a_payment"| Payment[Make a Payment Flow]
    Welcome -->|"credit_card.replace_card"| Replace[Lost/Lock/Replace Card Flow]
    Welcome -->|"credit_card.lock_card"| Lock[Lost/Lock/Replace Card Flow]
    Welcome -->|"credit_card.lost_card"| Lost[Lost/Lock/Replace Card Flow]
    Welcome -->|"credit_card.charges"| Charges[Investigate Charges Flow]
    
    subgraph Integration Points
        API[FinServ API]
        style API fill:#ddf,stroke:#666
    end
    
    Balance --> API
    Payment --> API
    Replace --> API
    Lock --> API
    Lost --> API
    Charges --> API
    
    style Start fill:#ddf
    style Welcome fill:#fff
    style Balance fill:#ddf
    style Payment fill:#ddf
    style Replace fill:#ddf
    style Lock fill:#ddf
    style Lost fill:#ddf
    style Charges fill:#ddf
```

### Entry Points
- Default Welcome Intent
- Direct task intents (balance, payment, card services)

### Integration Details
1. **Financial Services API**
   - Endpoint: europe-west2 region
   - Timeout: 5 seconds
   - Services:
     - Account validation
     - Balance checking
     - Payment processing
     - Card operations

2. **Webhook Configuration**
   - Name: cxPrebuiltAgentsFinServ
   - Type: Generic Web Service
   - Region: europe-west2
   - Timeout: 5 seconds

## Make a Payment Flow
```mermaid
graph TD
    Start[Make a Payment] --> Check{Card Verified?}
    Check -->|"No"| Validation[Account Validation Flow]
    Check -->|"Yes"| Payment[Collect Payment Choice]
    
    subgraph External Services
        Auth[Authentication API]
        Gateway[Payment Gateway]
        style Auth fill:#ddf,stroke:#666
        style Gateway fill:#ddf,stroke:#666
    end
    
    Validation --> Auth
    Payment --> Gateway
    
    Error[Error Handler] -.->|"no-match"| Current
    Error -.->|"no-input"| Current
    Error -.->|"timeout"| Retry[Retry Logic]
    
    style Start fill:#ddf
    style Check fill:#fff
    style Validation fill:#ddf
    style Payment fill:#fff
    style Error fill:#fdd
    style Retry fill:#fdd
```

### Prerequisites
- Card verification status
- Account validation

### Integration Points
1. **Authentication API**
   - Purpose: Card verification
   - Timeout handling: 5s with retry
   - Error scenarios handled

2. **Payment Gateway**
   - Purpose: Payment processing
   - Timeout handling: 5s with retry
   - Success/failure callbacks

### Error Handling
- No-match fallbacks
- No-input fallbacks
- Integration timeouts
- Contextual reprompts

For detailed error handling patterns for these integration points, see [Error Handling](06-error-handling.md#error-prevention-patterns).

For state management of integration responses, see [State Management](07-state-management.md#managing-integration-states).

## Flow-Specific Integration Details

### Check Balance Flow
```mermaid
graph TD
    Start[Start] -->|"1. Verify"| Auth[Authentication]
    Auth -.->|"2. validate_card"| Webhook[Webhook]
    Webhook -.->|"3. verify"| AuthAPI[Auth API]
    Auth -->|"4. Success"| Balance[Get Balance]
    Balance -.->|"5. get_balance"| Webhook2[Webhook]
    Webhook2 -.->|"6. fetch"| AccountAPI[Account API]
    
    style Start fill:#fff,stroke:#666
    style Auth fill:#fff,stroke:#666
    style Balance fill:#fff,stroke:#666
    style Webhook fill:#ddf,stroke:#666
    style Webhook2 fill:#ddf,stroke:#666
    style AuthAPI fill:#ddf,stroke:#666
    style AccountAPI fill:#ddf,stroke:#666
```

#### Integration Points
- **Webhook**: cxPrebuiltAgentsFinServ
- **External Systems**: Authentication API, Account Services API
- **Data Flow**:
  ```yaml
  input:
    - card_number: string
    - verification_token: string
  output:
    - balance: number
    - last_updated: timestamp
    - currency: string
  ```

### Make Payment Flow
```mermaid
graph TD
    Start[Start] -->|"1. Verify"| Auth[Authentication]
    Auth -.->|"2. validate_card"| Webhook[Webhook]
    Webhook -.->|"3. verify"| AuthAPI[Auth API]
    Auth -->|"4. Success"| Payment[Process Payment]
    Payment -.->|"5. process"| Webhook2[Webhook]
    Webhook2 -.->|"6. execute"| PaymentAPI[Payment API]
    
    style Start fill:#fff,stroke:#666
    style Auth fill:#fff,stroke:#666
    style Payment fill:#fff,stroke:#666
    style Webhook fill:#ddf,stroke:#666
    style Webhook2 fill:#ddf,stroke:#666
    style AuthAPI fill:#ddf,stroke:#666
    style PaymentAPI fill:#ddf,stroke:#666
```

#### Integration Points
- **Webhook**: cxPrebuiltAgentsFinServ
- **External Systems**: Authentication API, Payment Gateway
- **Data Flow**:
  ```yaml
  input:
    - card_number: string
    - amount: number
    - currency: string
    - payment_type: string
  output:
    - transaction_id: string
    - status: string
    - confirmation_code: string
  ```
