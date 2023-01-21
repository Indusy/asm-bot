import path from "path";

import { program } from "commander";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import TelegramBot from "node-telegram-bot-api";

import { registerFunctions } from "./functions";

program
  .option("-c, --config <env_file>", "env file path", ".env")
  .option("-t, --token <bot_token>", "bot token")
  .action((options) => {
    let bot: TelegramBot;
    if (options.token) {
      bot = new TelegramBot(options.token, {
        polling: true,
      });
      registerFunctions(bot);
    } else if (options.config) {
      const realPath = path.resolve(process.cwd(), options.config);
      dotenvExpand.expand(
        dotenv.config({
          path: realPath,
        })
      );
      if (process.env.BOT_TOKEN) {
        bot = new TelegramBot(process.env.BOT_TOKEN as string, {
          polling: true,
        });
        registerFunctions(bot);
      } else {
        program.error("bot token is not provided");
      }
    } else {
      program.help();
    }
  });
program.parse();
