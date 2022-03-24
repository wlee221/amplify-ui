<script setup lang="ts">
import { toRefs } from 'vue';
import Amplify from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import aws_exports from '../aws-exports';

Amplify.configure(aws_exports);

const { user } = toRefs(useAuthenticator());
</script>

<template>
  <!-- TODO: this authenticator shouldn't be needed -->
  <authenticator></authenticator>
  <div>Hello, {{ user?.username }}!</div>
</template>
