import { BankAccount } from '../../@types/bankAccount';

export function fHTML(bankAccount: BankAccount) {
  return (
    <>
      <pre>Nomor akun:&nbsp;{bankAccount && bankAccount.accountNumber}</pre>
      <pre>Nama akun:&nbsp;{bankAccount && bankAccount.accountName}</pre>
      <pre>Nama bank:&nbsp;{bankAccount && bankAccount.bankName}</pre>
    </>
  );
}
