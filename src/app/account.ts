export class Account {
  constructor(
    public is_default_account: string | null,
    public account_naming: string | null,
    public company_name: string | null,
    public abi_code: string | null,
    public iban: string | null,
    public alias: string | null,
    public currency: string | null,
    public type: string | null
  ) {
    this.is_default_account = is_default_account;
    this.account_naming = account_naming;
    this.company_name = company_name;
    this.abi_code = abi_code;
    this.iban = iban;
    this.alias = alias;
    this.currency = currency;
    this.type = type;
  }
}
