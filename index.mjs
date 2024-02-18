#!/usr/bin/env node

import _yargs from "yargs";
import { hideBin } from "yargs/helpers";
const yargs = _yargs(hideBin(process.argv));
import { api } from "node-app-store-connect-api";

new Promise(async (resolve, reject) => {
  const argv = await yargs
    .option("issuerId", { type: "string", require: true })
    .option("apiKey", {
      type: "string",
      require: true,
    })
    .option("privateKey", {
      type: "string",
      require: true,
    })
    .option("workflowId", {
      type: "string",
      require: true,
    })
    .option("branchId", {
      type: "string",
      require: true,
    })
    .alias("issuerId", "i")
    .alias("apiKey", "k")
    .alias("privateKey", "p")
    .alias("workflowId", "w")
    .alias("branchId", "b").argv;

  const { issuerId, apiKey, privateKey, workflowId, branchId } = argv;

  const { fetch } = await api({
    issuerId,
    apiKey,
    privateKey,
  });

  const reponse = await fetch("ciBuildRuns", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        type: "ciBuildRuns",
        attributes: {},
        relationships: {
          workflow: {
            data: {
              type: "ciWorkflows",
              id: workflowId,
            },
          },
          sourceBranchOrTag: {
            data: {
              type: "scmGitReferences",
              id: branchId,
            },
          },
        },
      },
    }),
  });
  if (reponse.status === 201) {
    resolve("ciBuildRun created");
  } else {
    reject("ciBuildRun failed");
  }
});
