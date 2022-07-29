import { locales } from "../../locale/constants";

const { ES_ES, EN_US, PT_BR } = locales;

export const faqs = {
  [ES_ES]: [
    {
      id: 1,
      title: "¿Cómo funciona?",
      description:
        "¡Es muy simple!. En nuestra pàgina podrás ver aquellas personas que se hayan registrado, junto con su información. Si deseas contactar a alguien, solo hazlo a la dirección que figura en su tarjeta",
    },
    {
      id: 2,
      title: "¿Quienes pueden registrarse?",
      description:
        "Cualquier persona mayor de 18 años puede reigstrarse como usuario",
    },
    {
      id: 3,
      title: "¿Que costo tiene?",
      description: "¡Ninguno!. El uso de nuestra red es totalmente gratuito",
    },
  ],
  [EN_US]: [
    {
      id: 1,
      title: "How does it work?",
      description:
        "It's very simple! On our page you can see those people who have registered, along with their information. If you want to contact someone, just do it at the address that appears on their card",
    },
    {
      id: 2,
      title: "Who can register?",
      description: "Anyone over the age of 18 can register as a user",
    },
    {
      id: 3,
      title: "How much does it cost?",
      description: "None! Using our network is completely free",
    },
  ],
  [PT_BR]: [
    {
      id: 1,
      title: "Como funciona?",
      description:
        "É muito simples! Em nossa página você pode ver as pessoas que se cadastraram, junto com seus dados. Se quiser entrar em contato com alguém, basta fazê-lo no endereço que consta no cartão",
    },
    {
      id: 2,
      title: "Quem pode se registrar?",
      description:
        "Qualquer pessoa maior de 18 anos pode se registrar como usuário",
    },
    {
      id: 3,
      title: "Quanto custa?",
      description: "Nenhuma! Usar nossa rede é totalmente gratuito",
    },
  ],
};
