#!/bin/bash

# Define paths
SOURCE_DIR="nextjs-version-deprecated/out"
TARGET_DIR="backend-go-fiber/static"

echo "🧹 Cleaning static folder..."
# Create directory if it doesn't exist
mkdir -p "$TARGET_DIR"
# Remove all contents inside static
rm -rf "$TARGET_DIR"/*

echo "📂 Moving files from $SOURCE_DIR to $TARGET_DIR..."
# Copy contents (using cp -r is safer than mv to keep the build artifact available)
cp -r "$SOURCE_DIR"/* "$TARGET_DIR/"

echo "✅ Done! Files moved to $TARGET_DIR"
