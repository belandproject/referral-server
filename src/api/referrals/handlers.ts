import database from '../../database';
import ShortUniqueId from 'short-unique-id';
const { referral: Referral } = database.models;
const uid = new ShortUniqueId({ length: 6 });

export const createReferralLink = async ctx => {
  let retry = 0;
  while (retry < 5) {
    try {
      const referral = await Referral.create({
        code: uid(),
        address: ctx.state.user.user,
      });
      ctx.body = referral;
      return;
    } catch {
      retry++;
    }
  }
};

export const listReferrals = async ctx => {
  const data = await Referral.findAndCountAll({
    where: ctx.request.query,
  });
  ctx.body = data;
};
