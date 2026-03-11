import pytest
from fastapi.testclient import TestClient

from api_gateway_local.app.main import app as api_app
from transaction_service.app.main import app as tx_app

def test_api_gateway_health():
    with TestClient(api_app) as client:
        response = client.get("/healthz")
        assert response.status_code == 200
        assert response.json() == {"status": "ok", "service": "api_gateway_local"}

def test_transaction_service_health():
    with TestClient(tx_app) as client:
        response = client.get("/healthz")
        assert response.status_code == 200
        assert response.json() == {"status": "ok", "service": "transaction_service"}
