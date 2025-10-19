// Copyright (c) 2025 Alex de Abreu Gomes, Daniel Cruz, Jean Carlos, Rafael Bezerra, Wesllen D. B. Ferreira, Pedro Henrique, Tahlissa Vitoria.
// Licensed under Proprietary License - All rights reserved. Unauthorized usage or distribution is prohibited.

export type CarrosselAvatares = {
    id: string;
    img: any; // Aceita objetos retornados pelo require ou URIs de imagens
    isCustom?: boolean; // Indica se é uma foto personalizada
    uri?: string; // URI da imagem personalizada
};
