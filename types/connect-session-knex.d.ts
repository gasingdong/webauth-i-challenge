// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const connectSessionKnex: any;

declare module 'connect-session-knex' {
  export = connectSessionKnex;
}
