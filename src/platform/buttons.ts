import { stage_settings } from "../stg/test";

const start = <HTMLButtonElement>document.getElementById("stage_start");
const stage_dec = <HTMLButtonElement>document.getElementById("stage_dec");
const stage_inc = <HTMLButtonElement>document.getElementById("stage_inc");
const ability = <HTMLButtonElement>document.getElementById("ability_set");
const ability_dec = <HTMLButtonElement>document.getElementById("ability_dec");
const ability_inc = <HTMLButtonElement>document.getElementById("ability_inc");
const st = stage_settings;
const update = () => {
    stage_dec.disabled = st.stage == 0;
    stage_inc.disabled = st.stage == st.stage_list.length - 1;
    start.value = `${st.stage_list[st.stage].name}`;
    ability_dec.disabled = st.ability == 0;
    ability_inc.disabled = st.ability == st.ability_list.length - 1;
    ability.value = `${st.ability_list[st.ability].name}`;
    st.scale = st.stage_list[st.stage].default_scale;
}
stage_dec.onclick = () => {
    st.stage--;
    update();
}
stage_inc.onclick = () => {
    st.stage++;
    update();
}
ability_dec.onclick = () => {
    st.ability--;
    update();
}
ability_inc.onclick = () => {
    st.ability++;
    update();
}
update();