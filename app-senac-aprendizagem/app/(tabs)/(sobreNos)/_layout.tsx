// Copyright (c) 2025 Alex de Abreu Gomes, Daniel Cruz, Jean Carlos, Rafael Bezerra, Wesllen D. B. Ferreira, Pedro Henrique, Tahlissa Vitoria.
// Licensed under Proprietary License - All rights reserved. Unauthorized usage or distribution is prohibited.

import { Stack } from 'expo-router/stack';
import React from 'react';

export default function Layout() {
  return (
    <Stack 
      screenOptions={{
        headerShown: false,  // Desativa o cabeçalho globalmente
      }}
    > <Stack.Screen name="sobre" />
    </Stack>
  );
}
