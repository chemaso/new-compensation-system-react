//eslint-disable
import { AES, enc } from 'crypto-js'

const key = 'klfjflkjdfhj332134lkhdohfuiefho473r8347trf8c7g3783tgv734v6c67g3477f348675fdj283742394872389d2huxqkyqux138'

export const useAccount = () => {
    return {
        encrypt: (data) => AES.encrypt(JSON.stringify(data), key).toString(),
        decrypt: (data) => {
            const values = AES.decrypt(data, key)
            return JSON.parse(values.toString(enc.Utf8))
        }
    }
}