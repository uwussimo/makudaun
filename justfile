#!/usr/bin/env just --justfile

dev:
  deno run --allow-read --allow-write ./mod.ts readme.md

cache:
	deno cache ./mod.ts

compile:
	deno compile --allow-read --allow-write ./mod.ts
