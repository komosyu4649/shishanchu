import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { StrapiContent } from "@/type/strapi";

const ACCOUNTS = [
    {
        name: "1337",
        jwt: process.env.STRAPI_JWT_STORETEMPLATE
    },
    {
        name: "1338",
        jwt: process.env.STRAPI_JWT_STORETEMPLATE2
    }
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // ACCOUNTS分のサーバーAPIを1つの配列にまとめるAuthorization認証を加える
    
    try {
    const accounts:StrapiContent[] = await Promise.all(
      ACCOUNTS.map(async (account) => {
        const response = await axios.get(`http://localhost:${account.name}/api/contents?populate=*`, {
            headers: {
                Authorization: `Bearer ${account.jwt}`
            }
        });
        return response.data.data;
      })
    );

    // 配列をフラット化する
    const flattenedAccounts = accounts.flat();

    // createdAtが最新になるように並び替え
    const sortedAccounts = flattenedAccounts.sort((a, b) => new Date(b.attributes.createdAt).getTime() - new Date(a.attributes.createdAt).getTime());

    res.status(200).json(sortedAccounts);
    } 
    catch (err: any) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}