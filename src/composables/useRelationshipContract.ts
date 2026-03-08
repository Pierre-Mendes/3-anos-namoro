import { ref } from "vue";

const CONTRACT_KEY = "contractSigned";
const PARTNER_KEY = "partnerName";

export function useRelationshipContract() {
    const partnerName = ref(localStorage.getItem(PARTNER_KEY) || "");
    const signed = ref(localStorage.getItem(CONTRACT_KEY) === "true");

    function signContract(name: string) {
        partnerName.value = name;
        signed.value = true;

        localStorage.setItem(PARTNER_KEY, name);
        localStorage.setItem(CONTRACT_KEY, "true");
    }

    return {
        partnerName,
        signed,
        signContract,
    };
}
