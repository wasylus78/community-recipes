from passlib.context import CryptContext

# Switched to PBKDF2-SHA256 due to critical ValueError: password cannot be longer than 72 bytes bug with bcrypt.
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def get_password_hash(password: str) -> str:
    # PBKDF2 is secure and does not have the 72-byte length restriction issue.
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
