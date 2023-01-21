import TelegramBot from "node-telegram-bot-api";

import { getIcon, searchByKw } from "./utils/app-tracker";
import { leica } from "./utils/leica";

export function registerFunctions(bot: TelegramBot) {
  // echo
  bot.onText(/\/echo (.*)/, (ctx, match) => {
    const message = match?.[1];
    const chatId = ctx.chat.id;
    bot.sendMessage(chatId, message as string);
  });

  // leica
  bot.onText(/\/leica/, async (ctx) => {
    const chatId = ctx.chat.id;
    const msg = await bot.sendMessage(chatId, "回复此消息并附上图片");
    bot.onReplyToMessage(chatId, msg.message_id, async (ctx) => {
      const fileId = ctx.photo?.at(-1)?.file_id as string;
      if (!fileId) {
        return bot.sendMessage(ctx.chat.id, "你干嘛");
      }

      const link = await bot.getFileLink(fileId);

      const res = await fetch(link);
      const src = await res.arrayBuffer();

      bot.sendPhoto(chatId, await leica(Buffer.from(src)), {
        caption: "看看你的",
      });
    });
  });

  // app tracker
  bot.onText(/\/search_kw (.*)/, async (ctx, match) => {
    const chatId = ctx.chat.id;
    const kw = match?.[1] as string;
    const result = await searchByKw(kw);
    const data = result.items as Record<string, string>[];
    const blob = await getIcon(data[0].packageName);
    bot.sendPhoto(chatId, Buffer.from(await blob.arrayBuffer()), {
      caption: data[0].appName,
    });
  });
}
