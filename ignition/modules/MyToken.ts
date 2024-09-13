import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ReemarhModule = buildModule("ReemarhModule", (m) => {

  const token = m.contract("Reemarh");

  return { token };
});

export default ReemarhModule;
