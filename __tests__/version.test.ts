import {
  getVersionFromCommitSha,
  getVersionFromTag,
  setupVersion
} from '../src/version'
import moment from 'moment'

describe('version', () => {
  test('getVersionFromTag', () => {
    const paramsToTest = [
      'refs/tags/v1.1.1',
      'refs/tags/v100.100.100',
      'refs/tags/v1.1.1-rc1',
      'refs/tags/v1.1.1-rc2',
      'refs/tags/v1.1.1-hotfix1',
      'refs/tags/v1.1.1-hotfix2',
      '',
      undefined,
      'v1.1.1',
      'not match',
      'refs/tags',
      'refs/tags/v1'
    ]
    const expectResult = [
      'v1.1.1',
      'v100.100.100',
      'v1.1.1-rc1',
      'v1.1.1-rc2',
      'v1.1.1-hotfix1',
      'v1.1.1-hotfix2',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ]
    expect(expectResult.length).toEqual(paramsToTest.length)

    paramsToTest.forEach((param, index) => {
      expect(getVersionFromTag(param!)).toBe(expectResult[index])
    })
  })

  test('getVersionFromCommitSha', () => {
    expect(getVersionFromCommitSha('')).toBeUndefined()
  })

  test('setupVersion', () => {
    const paramsToTest = [
      {
        customizedVersion: undefined,
        githubRefType: 'tag',
        githubRef: 'refs/tags/v1.1.1',
        githubSha: 'ffac537e6cbbf934b08745a378932722df287a53'
      },
      {
        customizedVersion: undefined,
        githubRefType: 'tag',
        githubRef: 'refs/tags/v100.100.100-rc100',
        githubSha: 'ffac537e6cbbf934b08745a378932722df287a53'
      },
      {
        customizedVersion: undefined,
        githubRefType: 'tag',
        githubRef: 'refs/tags/v100.100.100-hotfix100',
        githubSha: 'ffac537e6cbbf934b08745a378932722df287a53'
      },
      {
        customizedVersion: undefined,
        githubRefType: 'branch',
        githubRef: 'refs/branch/test',
        githubSha: 'ffac537e6cbbf934b08745a378932722df287a53'
      },
      {
        customizedVersion: 'override',
        githubRefType: 'branch',
        githubRef: 'refs/branch/test',
        githubSha: 'ffac537e6cbbf934b08745a378932722df287a53'
      },
      {
        customizedVersion: 'override',
        githubRefType: 'tag',
        githubRef: 'refs/tags/v100.100.100-hotfix100',
        githubSha: 'ffac537e6cbbf934b08745a378932722df287a53'
      },
      {
        customizedVersion: '',
        githubRefType: 'tag',
        githubRef: 'refs/tags/v100.100.100-hotfix100',
        githubSha: 'ffac537e6cbbf934b08745a378932722df287a53'
      },
      {
        customizedVersion: undefined,
        githubRefType: 'tag',
        githubRef: 'refs/tags/illegal-tag',
        githubSha: 'ffac537e6cbbf934b08745a378932722df287a53'
      }
    ]
    const expectResult = [
      'v1.1.1',
      'v100.100.100-rc100',
      'v100.100.100-hotfix100',
      `v${moment().utc().format('YYYYMMDD').toString()}-ffac537`,
      'override',
      'override',
      'v100.100.100-hotfix100',
      `v${moment().utc().format('YYYYMMDD').toString()}-ffac537`
    ]
    expect(expectResult.length).toEqual(paramsToTest.length)

    paramsToTest.forEach((param, index) => {
      expect(
        setupVersion(
          param.customizedVersion,
          param.githubRefType,
          param.githubRef,
          param.githubSha
        )
      ).toBe(expectResult[index])
    })
  })
})
