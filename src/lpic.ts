
// The following two lines MUST be run befor ANY other lpic-modules
import { Logging, ValidLogger     } from "lpic-modules/dist/lib/logging.js"
const logger : ValidLogger = Logging.getLogger('lpic')

import { IConfig                  } from "lpic-modules/dist/lib/cfgrCollector.js"
import { CfgrHelpers              } from "lpic-modules/dist/lib/cfgrHelpers.js"
import { BaseConfig               } from "lpic-modules/dist/lib/configBase.js"
import { BuildConfig              } from "lpic-modules/dist/lib/configBuild.js"
import { TraceConfig              } from "lpic-modules/dist/lib/configTrace.js"
import { setupTMGTool, runTMGTool } from "lpic-modules/dist/lib/runner.js"

async function runTool() {

  IConfig.clearMetaData(TraceConfig)

  const config = CfgrHelpers.assembleConfigFrom(
    BaseConfig, BuildConfig, TraceConfig
  )
  
  await setupTMGTool(
    'lpic',
    'A tool to extract and build code from Literate Programming in ConTeXt documents.',
    '0.0.1',
    config
  )

  await runTMGTool(config)
}

runTool()
  .catch((err : any) => logger.error(err))
  .finally()

 Logging.close()