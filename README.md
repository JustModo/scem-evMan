# Pomelo
Self-hosted coding contest and assessment platform.

[![License](https://img.shields.io/badge/license-GPL-blue.svg)](LICENSE)

## Description
Pomelo is a self-hosted platform designed to manage programming contests, technical assessments, and hackathons. It integrates a Next.js frontend, an Express backend, and the Judge0 code execution engine to provide a complete environment for coding events. The platform is designed for privacy and control, allowing organizers to retain full data sovereignty while operating their own infrastructure.

The system utilizes an automated deployment model via a custom daemon and CLI, simplifying the provisioning of underlying services such as Docker containers and reverse proxies. It provides an administrative interface for managing application state, environment configurations, and container health.


## Installation

1. Download the installation script.
2. Execute the script with root privileges.

```bash
curl -fsSL https://raw.githubusercontent.com/so-sc/pomelo/main/scripts/install.sh -o install.sh
chmod +x install.sh
sudo ./install.sh
```

## Usage

Interact with the platform using the global command-line interface.

```bash
pomelo start
pomelo stop
pomelo status
pomelo logs
pomelo ui
```

The administrative interface is accessible via a web browser on port 8462.


## Contributing
Refer to CONTRIBUTING.md for local development instructions and contribution guidelines.

## License
This project is licensed under the GPL License. See the [LICENSE](LICENSE) file for details.
