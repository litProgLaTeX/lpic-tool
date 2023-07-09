
import yaml from "yaml"

import { BuildConfig  } from "lpic-modules/dist/lib/configBuild.js"
import { Document     } from "lpic-modules/dist/lib/documents.js"
import { Builders   } from "lpic-modules/dist/lib/builders.js"
import { Structures } from "lpic-modules/dist/lib/structures.js"

import { Logging, ValidLogger  } from "lpic-modules/dist/lib/logging.js"

const logger : ValidLogger = Logging.getLogger('lpic')

export function registerBuilders(config : BuildConfig) {

  Builders.addBuilder(
    'keyword.control.source.start.lpic',
    import.meta.url,
    async function(
      theTokens : string[],
      theLine   : number,
      theDoc    : Document | undefined
    ) {
      const codeType = theTokens[1]
      logger.debug("----------------------------------------------------------")
      logger.debug("startCode")
      logger.debug(` codeType: ${codeType}`)
      logger.debug(`theTokens: ${theTokens}`)
      logger.debug(`  theLine: ${theLine}`)
      if (theDoc) logger.debug(`   theDoc: ${theDoc.docName}`)
      logger.debug("----------------------------------------------------------")
      const code = Structures.getStructure('code')
      if (theDoc) code.startCodeFor(theDoc.docName, codeType, theLine)
    }
  )

}