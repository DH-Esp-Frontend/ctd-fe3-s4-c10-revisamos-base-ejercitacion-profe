import type { NextApiRequest, NextApiResponse } from "next";
import { FAQSAPIResponse } from "../../../types";
import { defaultLocale } from "../../../locale/constants";
import { faqs } from "../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FAQSAPIResponse>
) {
  // Obtenemos el idioma que recibiremos como parámetro
  // en el request
  const {
    query: { lan },
  } = req;

  // Utilizamos el idioma como "key" para acceder a la información.
  // en caso de que la misma no exista, retornamos la información en el
  // idioma por defecto.
  const faqsByLanguage = faqs[lan as string] ?? faqs[defaultLocale];

  res.status(200).json(faqsByLanguage);
}
