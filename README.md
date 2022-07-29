# Especializacion Frontend III - Semana 4 - Clase 10

## Base para la ejercitación (Profe)

En esta clase, vamos a retomar el proyecto de clase 6 (RandomIn), para que el profe pueda hacer un breve repaso de los temas aplicados. Además, estaremos agregando una nueva funcionalidad que implica el uso de API Routes e internacionalización.

### Paso 0: Repaso.

El primer paso, es hacer un recorido por el estado de la app para repasar los conceptos básicos relacionados con el uso de Next Js tales como: enrutamiento, assets y metadada.

Para ello el profe puede, por ejemplo, comenzar mostrando las dos páginas que se encuentran creadas dentro de la carpeta _pages_, haciendo referencia a cada una de las rutas de la aplicación. Además, dentro del componente <Header> que se encuentra en la carpeta _components_ puede verse el uso de la etiqueta <Link> para vincular cada una de ellas dentro del navbar.

Seguido a ello, puede explicarse el uso del componente <Layout>, que se encuentra dentro de la misma carpeta, el cual se utiliza para compartir el mismo header entre todas las páginas. Puede verse como se utiliza este componente dentro del archivo _\_app.tsx_ que se encuentra dentro de la carpeta _pages_.

En tercer lugar, puede explicarse el uso de metadata desde dos puntos de vista: el primero, utilizando el archivo _\_document.tsx_ a los fines de compartir el favicon a lo largo de toda la aplicacion; el segundo, empleando la etiqueda <Head> en cada una de las páginas (index.tsx y faqs.tsx), para agregar el título junto a una descripción particular para cada una de ellas.

También puede emplearse el logo de la app que se encuentra en el <Header> para explicar el uso de la etiqueta imagen. Aquí es importante mencionar donde debemos ubicar nuestras imágenes (dentro de la carpeta _public_) para poder utilizarlas luego.

Dentro de la carpeta _styles_ tenemos archivos css que emplean estilos locales (para cada componente) y globales, lo que puede utilizarse para repasar este tema.

Finalmente, podemos dedicar un momento a repasar el uso de las técnicas de _pre-fetching_ que estamos utilizando en los componentes _faqs.tsx_ e _index.tsx_ (getServerSideProps y getStaticProps), explicando las diferencias y casos de uso de cada uno.

### Paso 1: Implementamos un nuevo feature.

Habiendo concluido el repaso, vamos a implementar un nuevo feature. El mismo, consiste en agregar i18n para alterar los textos en función del idioma que la persona seleccione. Vamos a realizar esto desde dos puntos de vista: primero, haciendo dinámico los textos en el frontend para que los mismos cambien en base a la selección; segundo, "modificando" la API que nos devuelve las preguntas frecuentes, para que las mismas vengan en el idioma seleccionado. Estos son los pasos a seguir para llevar adelante dicha tarea:

_Agregamos constantes_
Vamos a crear una carpeta _locale_ en el root de la aplicación y, dentro de la misma, creamos un archivo _constants.ts_. En él, creamos un par de constantes que nos permitirán dinamizar el contenido:

```javascript
// Idiomas que soportará la app
const EN_US = "en-US";
const ES_ES = "es-ES";
const PT_BR = "pt-BR";

// Idioma por defecto
export const defaultLocale = ES_ES;

// Guardamos los idiomas en un objeto
// para exportarlos todos juntos
export const locales = {
  EN_US,
  ES_ES,
  PT_BR,
};

// Guardamos los nombres de cada idioma
// para usar en la botonera
export const localeNames = {
  [EN_US]: "English",
  [ES_ES]: "Español",
  [PT_BR]: "Português",
};

// Guardamos los distintos textos que usamos
// a lo largo de la app
export const TEXTS_BY_LANGUAGE = {
  [EN_US]: {
    // Menu de navegación
    HEADER: {
      HOME: "Home",
      FAQS: "FAQS",
    },
    MAIN: {
      // Para el meta tag de la Home
      DESCRIPTION:
        "A website where you can connect with other people quickly and easily",
      // Para la presentación de la página que va debajo del título
      SUBTITLE:
        "Here you can find the latest users who have joined our network",
    },
    FAQS: {
      // Título de la página de preguntas frecuentes
      TITLE: "Frequently Asked Questions",
      // Para el metatag de esta página
      DESCRIPTION: "Frequently asked questions about using the RandomIn app",
    },
  },
  [ES_ES]: {
    HEADER: {
      HOME: "Página principal",
      FAQS: "Preguntas frecuentes",
    },
    MAIN: {
      DESCRIPTION:
        "Una web en donde podrás conectar con otras personas de forma rápida y sencilla",
      SUBTITLE:
        "Aqui podrás encontrar los últimos usuarios que se han unido a la red",
    },
    FAQS: {
      TITLE: "Preguntas Frecuentes",
      DESCRIPTION: "Preguntas frecuentes del uso de la app RandomIn",
    },
  },
  [PT_BR]: {
    HEADER: {
      HOME: "Página principal",
      FAQS: "Perguntas Freqüentes",
    },
    MAIN: {
      DESCRIPTION:
        "Um site onde você pode se conectar com outras pessoas de forma rápida e fácil",
      SUBTITLE:
        "Aqui você pode encontrar os usuários mais recentes que ingressaram na rede",
    },
    FAQS: {
      TITLE: "Perguntas Freqüentes",
      DESCRIPTION: "Perguntas frequentes sobre o uso do web RandomIn",
    },
  },
};
```

Este archivo ya se encuentra en el proyecto base, pero puede mostrarse a los estudiantes ya que luego se utilizará en otros lados.

_Habilitamos i18n_
Para poder habilitar el uso de i18n dentro de Next, vamos a agregar la configuración necesaria dentro del archivo _next.config.js_

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["randomuser.me"],
  },
  reactStrictMode: true,
  i18n: {
    // Agregamos el listado de lenguages que vamos a soportar
    locales: ["en-US", "es-ES", "pt-BR"],
    // Elegimos el valor por default cuando accedemos a una ruta que no tenga fijada el valor del locale
    defaultLocale: "es-ES",
  },
};

module.exports = nextConfig;
```

_Modificamos el Header_

Ahora que ya habilitamos i18n, vamos a modificar el componente <Header> para hacerlo dinámico y, además, poder agregar la botonera que nos permitirá cambiar de idioma. Para ello, utilizaremos _useRouter()_ que nos permitirá detectar el idioma seleccionado, junto a las constantes que hemos creado anteriormente.

_Header.tsx_

```jsx
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Header.module.css";
import {
  defaultLocale,
  localeNames,
  locales,
  TEXTS_BY_LANGUAGE,
} from "../../locale/constants";

const Header: FC = () => {
  // Traemos la información del idioma utilizando useRouter()
  const { locale, asPath } = useRouter();

  // Accedemos a los textos del Header que tenemos en nuestra
  // constante, usando el idioma como "key"
  const { HEADER } =
    TEXTS_BY_LANGUAGE[
      (locale || defaultLocale) as keyof typeof TEXTS_BY_LANGUAGE
    ];

  return (
    <header className={styles.header}>
      <div className={styles.leftSide}>
        <div className={styles.logo}>
          <figure>
            <Image
              src="/red.png"
              layout="fixed"
              width={50}
              height={50}
              alt="logo"
            />
          </figure>
        </div>
        {/* Asignamos los nombres de la barra de navegación
         dinámicamente utilizando las constantes */}
        <div className={styles.navbar}>
          <Link href="./">{HEADER.HOME}</Link>
          <Link href="./faqs">{HEADER.FAQS}</Link>
        </div>
      </div>
      <div className={styles.localeSwitch}>
        {/* Creamos la botonera para cambiar de idioma.
            Mediante el atributo locale le indicamos a Next que idioma queremos utilizar al hacer la
            redirección
           */}
        <Link href={asPath} locale={locales.ES_ES}>
          <p className={locale === locales.ES_ES ? styles.active : ""}>
            <Image
              src="/spanish.png"
              alt="spanish"
              layout="fixed"
              width={20}
              height={20}
            />
            {localeNames[locales.ES_ES as keyof typeof localeNames]}
          </p>
        </Link>
        <Link href={asPath} locale={locales.PT_BR}>
          <p className={locale === locales.PT_BR ? styles.active : ""}>
            <Image
              src="/brazil.png"
              alt="usa"
              layout="fixed"
              width={20}
              height={20}
            />
            {localeNames[locales.PT_BR as keyof typeof localeNames]}
          </p>
        </Link>
        <Link href={asPath} locale={locales.EN_US}>
          <p className={locale === locales.EN_US ? styles.active : ""}>
            <Image
              src="/usa.png"
              alt="usa"
              layout="fixed"
              width={20}
              height={20}
            />
            {localeNames[locales.EN_US as keyof typeof localeNames]}
          </p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
```

Al finalizar este paso, podremos cambiar de idioma haciendo click en los botones, y veremos como Next modifica la URL agregando el idioma seleccionado.

_Modificamos los componentes index.tsx y faqs.tsx_
Vamos a ocuparnos de dinamizar los textos de las dos páginas que tenemos. Para ello, emplearemos la misma lógica que en el header, utilizando _useRouter()_ para obtener el lenguage y acceder a los textos utilizando dicha información:

_index.tsx_

```jsx
const Home: NextPage<IProps> = ({ data: { results } }) => {
  // Traemos la información del idioma utilizando useRouter()
  const { locale } = useRouter();

  // Accedemos a los textos del Header que tenemos en nuestra
  // constante, usando el idioma como "key"
  const { MAIN } =
    TEXTS_BY_LANGUAGE[
      (locale || defaultLocale) as keyof typeof TEXTS_BY_LANGUAGE
    ];

  const renderResults = () =>
    results.map(
      ({
        email,
        picture: { medium },
        name: { first, last },
        login: { username },
      }) => (
        <div className={styles.card} key={username}>
          <picture className={styles.avatar}>
            <Image
              src={medium}
              alt={first}
              layout="fixed"
              width={100}
              height={100}
            />
          </picture>
          <h2>{`${first} ${last}`}</h2>
          <p>{username}</p>
          <p>{email}</p>
        </div>
      )
    );

  return (
    <div className={styles.container}>
      <Head>
        <title>RandomIn</title>
        {/* Asignamos el metatag dinámicamente utilizando
            nuestra constante */}
        <meta name="description" content={MAIN.DESCRIPTION} />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Random<span className={styles.highlight}>In</span>
        </h1>
        {/* Asignamos el subtítulo dinámicamente utilizando
            nuestra constante */}
        <p className={styles.description}>{MAIN.SUBTITLE}</p>

        <div className={styles.grid}>{renderResults()}</div>
      </main>
      <footer className={styles.footer}>
        <b>
          Hecho con
          <span className={styles.logo}>
            <Image src="/heart.png" alt="Vercel Logo" width={20} height={20} />
          </span>
          por DH
        </b>
      </footer>
    </div>
  );
};
```

_faqs.tsx_

```jsx
const FAQS: NextPage<IProps> = ({ data }) => {
  // Traemos la información del idioma utilizando useRouter()
  const { locale } = useRouter();

  // Accedemos a los textos del Header que tenemos en nuestra
  // constante, usando el idioma como "key"
  const { FAQS } =
    TEXTS_BY_LANGUAGE[
      (locale || defaultLocale) as keyof typeof TEXTS_BY_LANGUAGE
    ];

  return (
    <div className={styles.container}>
      <Head>
        {/* Asignamos los valores dinámicamente */}
        <title>{`RandomIn - ${FAQS.TITLE}`}</title>
        <meta name="description" content={FAQS.DESCRIPTION} />
      </Head>
      {/* Asignamos los valores dinámicamente */}
      <h2 className={styles.colorText}>{FAQS.TITLE}</h2>
      {data.map(({ id, title, description }) => (
        <div key={id}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      ))}
    </div>
  );
};
```

Con esto hemos terminado de dinamizar el contenido en el front. Ahora, vamos a ocuparnos de la API de FAQS.

_Creamos una API Route dinámica para las FAQS_

Hasta ahora, nuestra app consumia un endpoint que devolvía las preguntas frequentes en un único idioma. Vamos a cambiar esto creando una API Route que reciba el lenguaje como query param y, en base a ello, retorne la información en el idioma que corresponda. Como punto de partida, dentro de la carpeta _pages/api_ tenemos el archivo _db.ts_, el cual contiene la información para cada idioma. Este archivo ya se encuentra creado pero puede mostrarse a los estudiantes ya que lo utilizaremos luego en nuestra API Route.

Como lo que buscamos es una ruta dinámica que reciba el lenguaje como parámetro, vamos a crear un archivo con la siguiente estructura: `pages/api/faqs/[lan].ts`. Esto nos permitirá luego acceder dinámicamente al valor que se encuentre en la última posición de nuestra ruta.

Dentro del archivo _[lan].ts_ creamos nuestro handler, obteniendo el valor del idioma y retornando el contenido en base al mismo.

_[lan].ts_

```javascript
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
```

Ya que tenemos este paso completo, vamos a modificar el método _getStaticProps_ del componente _faqs.tsx_ para poder enviar el idioma dentro del request.

_faqs.tsx_

```javascript
// Accedemos a la propiedad "locale" que se encuentra
// dentro del contexto del método getStaticProps
export async function getStaticProps({
  locale,
}: {
  locale: string,
}): Promise<{ props: { data: FAQSAPIResponse } }> {
  const baseUrl = "http://localhost:3000/"; // Cambiar por la url del proyecto una vez deployada la API

  // Efectuamos el request agregando el idioma que recibimos
  // del contexto.
  const response = await fetch(`${baseUrl}/api/faqs/${locale}`);

  const data = await response.json();

  return {
    props: { data },
  };
}
```

De esta manera, podemos ver que cada vez que cambiamos de idioma el contenido de la página se modifica en base a dicha selección.

### Extra: Despliegue en Vercel.

Ahora que ya tenemos nuestra app funcionando localmente, podemos hacer el despliegue en Vercel. Este paso queda como opcional en base al tiempo disponible de la clase.
Tener en cuenta que vamos a necesitar realizar primero un primer deploy para poder obtener la url, y luego modificar la url base dentro del componente _faqs.tsx_ para que el mimso consuma dicha ruta en vez de localhost):

```javascript
const baseUrl = "http://localhost:3000/"; // Cambiar por la url del proyecto una vez deployada la API
```

Cambiando esto, hacemos un push, esperamos que se deploye y nuestra app debería quedar funcionando perfectamente en el entorno de Vercel.

Pueden ver el proyecto terminado dentro de la rama _"exercise-completed"_
