/* Dados operacionais da BRASA INOX.
   O texto visível também está no HTML para a página funcionar sem JavaScript. */
const BRASA = {
  brand: "BRASA INOX",
  phoneDisplay: "(31) 99932-5641",
  phoneIntl: "5531999325641",
  primaryUrl:
    "https://wa.me/5531999325641?text=Ol%C3%A1%21%20Conheci%20a%20BRASA%20INOX%20pelo%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento.",
  camalyUrl: "https://camaly.com.br/",
  instagram: "",
  messages: {
    principal:
      "Olá! Conheci a BRASA INOX pelo site e gostaria de solicitar um orçamento.",
    sobre:
      "Olá! Conheci a BRASA INOX pelo site e gostaria de conversar sobre o meu projeto.",
    bancadas:
      "Olá! Conheci a BRASA INOX pelo site e gostaria de solicitar um orçamento de bancada, mesa ou pia.",
    churrasqueiras:
      "Olá! Conheci a BRASA INOX pelo site e gostaria de solicitar um orçamento de churrasqueira ou grelha.",
    braseiros:
      "Olá! Conheci a BRASA INOX pelo site e gostaria de consultar braseiros e sistemas de grill giratório.",
    lareiras:
      "Olá! Conheci a BRASA INOX pelo site e gostaria de conversar sobre lareiras.",
    coifas:
      "Olá! Conheci a BRASA INOX pelo site e gostaria de solicitar um orçamento de coifa ou estrutura em inox.",
    profissionais:
      "Olá! Conheci a BRASA INOX pelo site e gostaria de solicitar um orçamento de equipamento para cozinha profissional.",
    especiais:
      "Olá! Conheci a BRASA INOX pelo site e gostaria de enviar a minha ideia para um projeto sob medida.",
    gourmet:
      "Olá! Conheci a BRASA INOX pelo site e gostaria de planejar o meu espaço gourmet.",
    projetos:
      "Olá! Conheci a BRASA INOX pelo site e gostaria de pedir um orçamento de um projeto.",
    processo:
      "Olá! Conheci a BRASA INOX pelo site e gostaria de começar o meu orçamento."
  },
  catalog: [
    {
      id: "bancadas",
      title: "Bancadas, mesas e pias",
      image: "assets/images/bancada-pia.webp",
      message: "bancadas"
    },
    {
      id: "churrasqueiras",
      title: "Churrasqueiras e grelhas",
      image: "assets/images/churrasqueira-coifa.webp",
      message: "churrasqueiras"
    },
    {
      id: "braseiros",
      title: "Braseiros e sistemas de grill giratório",
      image: "assets/images/braseiro-circular.webp",
      message: "braseiros"
    },
    {
      id: "lareiras",
      title: "Lareiras e equipamentos gourmet",
      image: "assets/images/lareira-linear.webp",
      message: "lareiras"
    },
    {
      id: "coifas",
      title: "Coifas e estruturas em inox",
      image: "assets/images/coifa-linha.webp",
      message: "coifas"
    },
    {
      id: "cozinhas",
      title: "Equipamentos para cozinhas profissionais",
      image: "assets/images/espetos-profissional.webp",
      message: "profissionais"
    },
    {
      id: "especiais",
      title: "Projetos especiais sob medida",
      image: "",
      message: "especiais"
    }
  ],
  gallery: [
    { src: "assets/images/churrasqueira-embutida.webp", category: "churrasqueiras", caption: "Churrasqueira embutida." },
    { src: "assets/images/lareira-linear.webp", category: "braseiros", caption: "Lareira linear." },
    { src: "assets/images/espetos-giratorios.webp", category: "churrasqueiras", caption: "Sistema de espetos giratórios." },
    { src: "assets/images/churrasqueira-coifa.webp", category: "churrasqueiras", caption: "Churrasqueira com coifa em inox." },
    { src: "assets/images/grelhas.webp", category: "churrasqueiras", caption: "Grelhas em aço inox." },
    { src: "assets/images/braseiro-circular.webp", category: "braseiros", caption: "Braseiro circular." },
    { src: "assets/images/bancada-pia.webp", category: "bancadas", caption: "Bancada e pia em inox." },
    { src: "assets/images/bancada.webp", category: "bancadas", caption: "Bancada em aço inox." },
    { src: "assets/images/coifa-linha.webp", category: "bancadas", caption: "Coifa em aço inox." },
    { src: "assets/images/espetos-profissional.webp", category: "churrasqueiras", caption: "Linha de espetos com coifa." },
    { src: "assets/images/nicho-grelha.webp", category: "churrasqueiras", caption: "Nicho com grelhas em aço inox." },
    { src: "assets/images/lareira-dupla.webp", category: "braseiros", caption: "Lareira linear em inox." },
    { src: "assets/images/braseiro-lenha.webp", category: "braseiros", caption: "Braseiro circular com base para lenha." },
    { src: "assets/images/referencia-linha.webp", category: "referencia", caption: "Linha de lareiras, coifas e churrasqueiras." },
    { src: "assets/images/referencia-lareira-piso.webp", category: "referencia", caption: "Lareira de piso em aço inox." },
    { src: "assets/images/referencia-coifas.webp", category: "referencia", caption: "Coifas em aço inox." }
  ]
};

function brasaWhatsapp(text) {
  return "https://wa.me/" + BRASA.phoneIntl + "?text=" + encodeURIComponent(text);
}

function brasaBudgetMessage(data) {
  return [
    "Olá! Conheci a BRASA INOX pelo site e gostaria de um orçamento.",
    "Nome: " + data.nome,
    "Cidade/UF: " + data.cidade,
    "Produto de interesse: " + data.produto,
    "Sobre o projeto: " + data.mensagem
  ].join("\n");
}
