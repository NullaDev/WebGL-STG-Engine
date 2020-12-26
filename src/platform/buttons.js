const start = document.getElementById("stage_start");
const dec = document.getElementById("stage_dec");
const inc = document.getElementById("stage_inc");
const st = debug_info.stage;
const update = () => {
    dec.disabled = st.stage == 0;
    inc.disabled = st.stage == st.list.length - 1;
    start.value = `start stage ${st.list[st.stage].name}`;
}
dec.onclick = () => {
    if (st.stage > 0)
        st.stage--;
    update();
}
inc.onclick = () => {
    if (st.stage < st.list.length)
        st.stage++;
    update();
}
update();