interface Cards {
  title: string;
  image: string;
  size?: string;
}
export interface IHomeBConfig {
  starting_title: string;
  session_b_title: string;
  session_c_title: string;

  session_a: Cards[];
  session_b: Cards[];
  session_c: Cards[];
}

export const HomeBConfig: IHomeBConfig = {
  starting_title: "É ótimo ver você",
  session_b_title: "Tópicos que pensei que você gostaria",
  session_c_title: "Algo novo",

  session_a: [
    {
      title: "Obtenha receitas para qualquer tipo de restrição alimentar",
      image:
        "https://t3.ftcdn.net/jpg/05/71/06/76/360_F_571067620_JS5T5TkDtu3gf8Wqm78KoJRF1vobPvo6.jpg",
      size: "large",
    },
    {
      title: "Obtenha um plano de exercícios",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/022/515/438/small/ai-generative3d-texture-colorful-abstract-background-for-desktop-wallpaper-image-free-photo.jpg",
      size: "small",
    },
    {
      title: "Encontre uma receita que contenha os itens em sua geladeira",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4XdCTkQbdHUwEoS4qyka8twyh2Au3yL_rgNA23rzSZ3jcfLjqCjnHE2uDzQGc5oC7KfM&usqp=CAU",
      size: "small",
    },
  ],

  session_b: [
    {
      title: "Obtenha receitas para qualquer tipo de restrição alimentar",
      image:
        "https://t3.ftcdn.net/jpg/05/71/06/76/360_F_571067620_JS5T5TkDtu3gf8Wqm78KoJRF1vobPvo6.jpg",
      size: "large",
    },
    {
      title: "Obtenha um plano de exercícios",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/022/515/438/small/ai-generative3d-texture-colorful-abstract-background-for-desktop-wallpaper-image-free-photo.jpg",
      size: "small",
    },
    {
      title: "Encontre uma receita que contenha os itens em sua geladeira",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4XdCTkQbdHUwEoS4qyka8twyh2Au3yL_rgNA23rzSZ3jcfLjqCjnHE2uDzQGc5oC7KfM&usqp=CAU",
      size: "small",
    },
  ],
  session_c: [
    {
      title: "Obtenha receitas para qualquer tipo de restrição alimentar",
      image:
        "https://t3.ftcdn.net/jpg/05/71/06/76/360_F_571067620_JS5T5TkDtu3gf8Wqm78KoJRF1vobPvo6.jpg",
      size: "large",
    },
    {
      title: "Obtenha um plano de exercícios",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/022/515/438/small/ai-generative3d-texture-colorful-abstract-background-for-desktop-wallpaper-image-free-photo.jpg",
      size: "small",
    },
    {
      title: "Encontre uma receita que contenha os itens em sua geladeira",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4XdCTkQbdHUwEoS4qyka8twyh2Au3yL_rgNA23rzSZ3jcfLjqCjnHE2uDzQGc5oC7KfM&usqp=CAU",
      size: "small",
    },
  ],
};
