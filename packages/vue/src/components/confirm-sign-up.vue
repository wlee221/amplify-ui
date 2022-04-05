<script setup lang="ts">
import {
  computed,
  useAttrs,
  toRefs,
  onUnmounted,
  onMounted,
  ref,
  ComputedRef,
  Ref,
} from 'vue';
import {
  getActorState,
  getFormDataFromEvent,
  SignUpState,
  translate,
} from '@aws-amplify/ui';

import { useAuthenticator, useAuth } from '../composables/useAuth';
import { createSharedComposable } from '@vueuse/core';
import BaseFormFields from './primitives/base-form-fields.vue';

const attrs = useAttrs();
const emit = defineEmits(['confirmSignUpSubmit', 'lostCodeClicked']);

const useAuthShared = createSharedComposable(useAuthenticator);
const { isPending, error, codeDeliveryDetails, toSignIn, setError } = toRefs(
  useAuthShared()
);
const { submitForm, updateForm, resendCode } = useAuthShared();
const { state } = useAuth();

const actorState = computed(() =>
  getActorState(state.value)
) as ComputedRef<SignUpState>;

const emailLink = actorState.value.context.emailLink;
const intent = actorState.value.context.intent;

// Only two types of delivery methods is EMAIL or SMS
const confirmSignUpHeading = computed(() => {
  return codeDeliveryDetails.value?.DeliveryMedium === 'EMAIL'
    ? translate('We Emailed You')
    : codeDeliveryDetails.value?.DeliveryMedium === 'SMS'
    ? translate('We Texted You')
    : translate('We Sent A Code');
});

const interval = ref(null as unknown as NodeJS.Timer);
const resendCodeText = computed(() =>
  emailLink ? translate('Resend Link') : translate('Resend Code')
);
const confirmText = computed(() => translate('Confirm'));
const emailMessage = translate(
  'Your code is on the way. To log in, enter the code we emailed to'
);
const textedMessage = translate(
  'Your code is on the way. To log in, enter the code we texted to'
);
const defaultMessage = translate(
  'Your code is on the way. To log in, enter the code we sent you. It may take a minute to arrive.'
);
const minutesMessage = translate('It may take a minute to arrive.');
const subtitleText = computed(() => {
  return codeDeliveryDetails.value?.DeliveryMedium === 'EMAIL'
    ? `${emailMessage} ${codeDeliveryDetails.value?.Destination}. ${minutesMessage}`
    : codeDeliveryDetails.value?.DeliveryMedium === 'SMS'
    ? `${textedMessage} ${codeDeliveryDetails.value?.Destination}. ${minutesMessage}`
    : translate(`${defaultMessage}`);
});

const subText = emailLink
  ? translate(`Please click on the link in the email to verify your account.
It will take several minutes to arrive. Leave this window open.`)
  : subtitleText.value;

const subText2 = translate(
  'This window will automatically log you in after you click the verify link.'
);

// Methods
const onInput = (e: Event): void => {
  const { name, value } = <HTMLInputElement>e.target;
  updateForm({ name, value });
};

const onConfirmSignUpSubmit = (e: Event): void => {
  if (attrs?.onConfirmSignUpSubmit) {
    emit('confirmSignUpSubmit', e);
  } else {
    submit(e);
  }
};

const intervalSubmit = (interval: Ref<NodeJS.Timer>) => {
  const start = Date.now();
  interval.value = setInterval(() => {
    if (Date.now() - start > 30000) {
      clearInterval(interval.value);
      toSignIn.value();
      const errorMessage = translate('Error! Time Out!');
      setError.value(errorMessage);
      return;
    }
    submitForm({ confirmation_code: '000' });
  }, 5000);
};
const submit = (e: Event): void => {
  submitForm(getFormDataFromEvent(e));
};

const onLostCodeClicked = (): void => {
  if (attrs?.onLostCodeClicked) {
    emit('lostCodeClicked');
  } else {
    resendCode();
  }
};

onMounted(() => {
  if (intent) {
    // send out resendCode since user is coming from sign in
    resendCode();
  }
  if (emailLink) {
    intervalSubmit(interval);
  }
});

onUnmounted(() => {
  clearInterval(interval.value);
});
</script>

<template>
  <slot v-bind="$attrs" name="confirmSignUpSlotI">
    <base-wrapper v-bind="$attrs">
      <base-form @input="onInput" @submit.prevent="onConfirmSignUpSubmit">
        <base-wrapper class="amplify-flex" style="flex-direction: column">
          <slot name="header">
            <base-heading
              class="amplify-heading"
              style="font-size: 1.5rem"
              :level="3"
            >
              {{ confirmSignUpHeading }}
            </base-heading>
          </slot>
          <base-text style="margin-bottom: 1rem">
            {{ subText }}
          </base-text>
          <base-text v-if="emailLink" style="margin-bottom: 1rem">
            {{ subText2 }}
          </base-text>

          <base-field-set
            v-if="!emailLink"
            class="amplify-flex"
            style="flex-direction: column"
            :disabled="isPending"
          >
            <base-form-fields route="confirmSignUp"></base-form-fields>
          </base-field-set>

          <base-footer
            class="amplify-flex"
            style="flex-direction: column; align-items: unset"
          >
            <template v-if="!emailLink">
              <base-alert v-if="error">
                {{ translate(error) }}
              </base-alert>
              <amplify-button
                class="amplify-field-group__control"
                data-fullwidth="false"
                data-loading="false"
                data-variation="primary"
                type="submit"
                style="font-weight: normal"
                :disabled="isPending"
              >
                {{ confirmText }}
              </amplify-button>
              <amplify-button
                class="amplify-field-group__control"
                data-fullwidth="false"
                data-variation="default"
                style="font-weight: normal"
                type="button"
                @click.prevent="onLostCodeClicked"
              >
                {{ resendCodeText }}
              </amplify-button>
            </template>
            <amplify-button
              class="amplify-field-group__control"
              data-fullwidth="false"
              data-variation="default"
              style="font-weight: normal"
              type="button"
              @click.prevent="onLostCodeClicked"
            >
              {{ resendCodeText }}
            </amplify-button>
            <slot
              name="footer"
              :onConfirmSignUpSubmit="onConfirmSignUpSubmit"
              :onLostCodeClicked="onLostCodeClicked"
            >
            </slot>
          </base-footer>
        </base-wrapper>
      </base-form>
    </base-wrapper>
  </slot>
</template>
