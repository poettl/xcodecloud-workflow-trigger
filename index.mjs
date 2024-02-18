#!/usr/bin/env node

import yargs from "yargs";
import { api } from "node-app-store-connect-api";

const argv = yargs
  .option("issuerId", {
    alias: "i",
    description: "Issuer ID",
    type: "string",
    demandOption: true,
  })
  .option("apiKey", {
    alias: "k",
    description: "API Key",
    type: "string",
    demandOption: true,
  })
  .option("privateKey", {
    alias: "p",
    description: "Private Key",
    type: "string",
    demandOption: true,
  })
  .option("workflowId", {
    alias: "w",
    description: "Workflow ID",
    type: "string",
    demandOption: true,
  })
  .option("branchId", {
    alias: "b",
    description: "Branch ID",
    type: "string",
    demandOption: true,
  }).argv;

const { issuerId, apiKey, privateKey, workflowId, branchId } = argv;

return new Promise(async (resolve, reject) => {
  // Retrieving secrets from Secrets Manager
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
