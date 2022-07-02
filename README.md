# setup-artifact-version

## Usage

### Use $GITHUB_SHA or $GITHUB_REF as an artifact version

```yaml
steps:
  - uses: actions/checkout@v3
  - uses: coscene-io/setup-artifact-version@v1.0.0
    id: setup_artifact_version
  - run: |
      echo ${{ steps.setup_artifact_version.outputs.version }}
```

### Override version with customized value

It s really useless feature, lol.

```yaml
steps:
  - uses: actions/checkout@v3
  - uses: coscene-io/setup-artifact-version@v1.0.0
    id: setup_artifact_version
    with:
      customizedVersion: "test-version-1"
  - run: |
      echo ${{ steps.setup_artifact_version.outputs.version }}
```

### Use a customized version template to set up

**It 's a to-do feature.**

```yaml
steps:
  - uses: actions/checkout@v3
  - uses: coscene-io/setup-artifact-version@TBD
    id: setup_artifact_version
    with:
      commitVersionTemplate: "v{YYYYMMDD}-{ABBREV}"
      tagVersionTemplate: "{TAG}"
  - run: |
      echo ${{ steps.setup_artifact_version.outputs.version }}
```
