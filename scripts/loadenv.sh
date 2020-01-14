#!/usr/bin/env bash
set -eo pipefail

ENV=$(grep -v '^#' .env | xargs)
export $ENV
