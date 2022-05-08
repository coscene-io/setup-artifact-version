// The branch or tag ref that triggered the workflow run.
// For branches this is the format refs/heads/<branch_name>,
// for tags it is refs/tags/<tag_name>,
// and for pull requests it is refs/pull/<pr_number>/merge.
// This variable is only set if a branch or tag is available for the event type.
// For example, refs/heads/feature-branch-1.
import moment from 'moment'

export function getVersionFromTag(ref: string): string | undefined {
  if (!ref || ref.trim().length === 0) {
    return undefined
  }
  const regex = new RegExp(
    '^refs\\/tags\\/(v\\d+\\.\\d+\\.\\d+(-(rc|hotfix)\\d+)?)$',
    'gm'
  )
  const result = regex.exec(ref)
  if (!result || result.length === 0) {
    return undefined
  }
  return result[1]
}

// sha: The commit SHA that triggered the workflow
// For example, ffac537e6cbbf934b08745a378932722df287a53.
// used to achieve a similar result to the following command:
// git describe --always --dirty --abbrev=7
export function getVersionFromCommitSha(sha: string): string | undefined {
  if (!sha || sha.trim().length === 0) {
    return undefined
  }
  return `v${moment().utc().format('YYYYMMDD').toString()}${sha.substr(0, 7)}`
}

export function setupVersion(
  customizedVersion: string | undefined,
  githubRefType: string,
  githubRef: string,
  githubSha: string
): string | undefined {
  if (githubRefType === 'tag') {
    return (
      customizedVersion ||
      getVersionFromTag(githubRef) ||
      getVersionFromCommitSha(githubSha)
    )
  }
  return customizedVersion || getVersionFromCommitSha(githubSha)
}
