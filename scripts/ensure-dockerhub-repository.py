"""Create the public practice repository if missing; credentials stay in memory."""
import json
import os
import re
import sys
from urllib.error import HTTPError
from urllib.request import Request, urlopen


def request(method, path, payload=None, token=None):
    headers = {"Content-Type": "application/json", "Accept": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    data = json.dumps(payload).encode() if payload is not None else None
    req = Request("https://hub.docker.com" + path, data=data, headers=headers, method=method)
    try:
        with urlopen(req, timeout=30) as response:
            return response.status, json.load(response)
    except HTTPError as error:
        # Do not print responses which might contain authentication details.
        return error.code, {}


def main():
    username = os.environ["DOCKER_USERNAME"]
    secret = os.environ["DOCKER_PASSWORD"]
    repository = os.environ.get("DOCKER_REPOSITORY", "vixor-docker-auto")
    if not re.fullmatch(r"[a-z0-9][a-z0-9_-]*", username):
        raise RuntimeError("DOCKER_USERNAME must be a lowercase Docker Hub username.")
    if not re.fullmatch(r"[a-z0-9][a-z0-9._-]*", repository):
        raise RuntimeError("Invalid repository name.")
    status, auth = request("POST", "/v2/auth/token", {"identifier": username, "secret": secret})
    if status != 200 or not auth.get("access_token"):
        raise RuntimeError(f"Docker Hub authentication failed (HTTP {status}). Check the secrets.")
    token = auth["access_token"]
    print(f"::add-mask::{token}")
    root = f"/v2/namespaces/{username}/repositories"
    status, _ = request("GET", f"{root}/{repository}", token=token)
    if status == 200:
        print(f"Repository {username}/{repository} already exists.")
        return
    if status != 404:
        raise RuntimeError(f"Cannot check repository (HTTP {status}).")
    status, _ = request("POST", root, {
        "namespace": username,
        "name": repository,
        "registry": "docker.io",
        "is_private": False,
        "description": "Vixor: Next.js, Docker y GitHub Actions - practica universitaria",
    }, token)
    if status != 201:
        raise RuntimeError(f"Cannot create repository (HTTP {status}). Check token permissions.")
    print(f"Created public repository {username}/{repository}.")


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(f"Error: {error}", file=sys.stderr)
        sys.exit(1)
