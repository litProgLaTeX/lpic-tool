
import yaml from "yaml"

// The following two lines MUST be run befor ANY other lpic-modules
import { Logging, ValidLogger     } from "lpic-modules/dist/lib/logging.js"
const logger : ValidLogger = Logging.getLogger('lpic')

import { BuildConfig as Config    } from "lpic-modules/dist/lib/configBuild.js"
import { setupTMGTool, runTMGTool } from "lpic-modules/dist/lib/runner.js"

async function runTool() {
  const config : Config = await <Config>(<unknown>setupTMGTool(
    'lpic',
    'A tool to extract and build code from Literate Programming in ConTeXt documents.',
    '0.0.1', Config
  ))
  await runTMGTool(config)
}

runTool()
  .catch((err : any) => logger.error(err))
  .finally()

 Logging.close()