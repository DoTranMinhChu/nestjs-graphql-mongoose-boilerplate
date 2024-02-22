import { registerEnumType } from '@nestjs/graphql';

enum EUserBalanceType {
  RECEIVE_FROM_ADMIN = 'RECEIVE_FROM_ADMIN', //Received funds from the administrator
  WITHDRAWAL = 'WITHDRAWAL', // Withdrawal of funds
  DEPOSIT = 'DEPOSIT', // User deposits funds
  PURCHASE = 'PURCHASE', // User makes a purchase
  OTHER = 'OTHER', //Other balance transactions
}

registerEnumType(EUserBalanceType, {
  name: 'EUserBalanceType',
  description: 'The supported colors.',
  valuesMap: {
    RECEIVE_FROM_ADMIN: {
      description: 'Received funds from the administrator',
    },
    WITHDRAWAL: {
      description: ' Withdrawal of funds',
    },
    DEPOSIT: {
      description: ' User deposits funds',
    },
    PURCHASE: {
      description: ' User makes a purchase',
    },
    OTHER: {
      description: 'Other balance transactions',
    },
  },
});

export { EUserBalanceType };
