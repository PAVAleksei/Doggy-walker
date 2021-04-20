/* eslint-disable class-methods-use-this */
const Scene = require('telegraf/scenes/base');

class SceneGenerator {
  genNumberScene() {
    const number = new Scene('number');

    number.enter(async (ctx) => {
      await ctx.reply('Для авторизации введите число указанное выше');
    });
    number.on('text', async (ctx) => {
      const currentNumber = Number(ctx.message.text);
      if (currentNumber && currentNumber === 1234) {
        await ctx.reply('Спасибо за авторизацию!');
        ctx.scene.enter('name');
      } else {
        await ctx.reply('Упс, где-то ошибка!');
        ctx.scene.reenter();
      }
    });
    number.on('message', (ctx) => ctx.reply('Без числа не будет авторизации =( '));
    return number;
  }

  genNameScene() {
    const name = new Scene('name');
    name.enter((ctx) => ctx.reply('Как я могу к вам обращаться?'));
    name.on('text', async (ctx) => {
      const userName = ctx.message.text;
      if (userName) {
        await ctx.reply(`Привет, ${userName}, здесь я буду писать тебе о заказах`);
        await ctx.scene.leave();
      } else {
        await ctx.reply('Все же лучше с именем');
        await ctx.scene.reenter();
      }
    });
    name.on('message', (ctx) => ctx.reply('Явно не твоё имя'));
    return name;
  }
}

module.exports = SceneGenerator;
