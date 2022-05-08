import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

describe('main', () => {
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
  // shows how the runner will run a javascript action with env / stdout protocol
  test('test runs', () => {
    paramsToTest.forEach(params => {
      process.env['GITHUB_SHA'] = params.githubSha
      process.env['GITHUB_REF'] = params.githubRef
      process.env['GITHUB_REF_TYPE'] = params.githubRefType
      process.env['customizedVersion'] = params.customizedVersion
      const np = process.execPath
      const ip = path.join(__dirname, '..', 'lib', 'main.js')
      const options: cp.ExecFileSyncOptions = {
        env: process.env
      }
      console.log(cp.execFileSync(np, [ip], options).toString())
    })
  })
})
