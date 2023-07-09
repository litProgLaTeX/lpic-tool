
import yaml from "yaml"

import { BuildConfig             } from "lpic-modules/dist/lib/configBuild.js"
import { Builders                } from "lpic-modules/dist/lib/builders.js"
import { Document, DocumentCache } from "lpic-modules/dist/lib/documents.js"
import { Grammars                } from "lpic-modules/dist/lib/grammars.js"
import { ScopeActions            } from "lpic-modules/dist/lib/scopeActions.js"
import { Structures              } from "lpic-modules/dist/lib/structures.js"

import { Logging, ValidLogger    } from "lpic-modules/dist/lib/logging.js"

import { DocCodeChunks           } from "../actions/lpicActions.js"

const logger : ValidLogger = Logging.getLogger('lpic')

export function registerBuilders(
  config        : BuildConfig,
  builders      : Builders,
  documentCache : DocumentCache,
  grammars      : Grammars,
  scopeActions  : ScopeActions,
  structures    : Structures,
  logger        : ValidLogger
) {

  builders.addBuilder(
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
      const code = <DocCodeChunks>structures.getStructure('code')
      if (theDoc) code.startCodeFor(theDoc.docName, codeType, "unknown", theLine)
    }
  )

}