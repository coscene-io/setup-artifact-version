import * as core from '@actions/core'
import {setupVersion} from './version'

async function run(): Promise<void> {
  try {
    const githubSha = process.env.GITHUB_SHA
    const githubRef = process.env.GITHUB_REF
    const githubRefType = process.env.GITHUB_REF_TYPE
    const customizedVersion = core.getInput('customizedVersion', {
      required: false
    })
    if (!githubSha || !githubRef || !githubRefType) {
      core.setFailed(
        'GITHUB_SHA, GITHUB_REF, GITHUB_REF_TYPE is unexpectedly empty'
      )
      return
    }
    const version = setupVersion(
      customizedVersion,
      githubRefType,
      githubRef,
      githubSha
    )
    if (!version) {
      core.setFailed('version is unexpectedly empty')
    }
    core.setOutput('version', version)
    return
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
