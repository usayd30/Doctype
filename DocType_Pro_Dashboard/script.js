/* =========================================================
   DOCTYPE - DEMO DOCTOR BOOKING SYSTEM
   Includes: search, profiles, booking, online payment simulation,
   appointment history, cancellation and slot release.
   ========================================================= */

const doctors=[
{id:1,name:"Dr. Rahul Sharma",specialty:"Cardiologist",city:"Kanpur",experience:"14 years",fee:600,rating:4.9,patients:1250,avatar:"👨‍⚕️",about:"Experienced cardiologist focused on preventive heart care and cardiac consultations.",times:["10:00 AM","11:30 AM","1:00 PM","3:30 PM","5:00 PM"]},
{id:2,name:"Dr. Priya Verma",specialty:"Dermatologist",city:"Kanpur",experience:"9 years",fee:500,rating:4.8,patients:890,avatar:"👩‍⚕️",about:"Dermatology consultations for common skin and hair concerns.",times:["9:30 AM","11:00 AM","2:00 PM","4:30 PM","6:00 PM"]},
{id:3,name:"Dr. Amit Singh",specialty:"Dentist",city:"Lucknow",experience:"11 years",fee:400,rating:4.7,patients:720,avatar:"👨‍⚕️",about:"General dental consultation and preventive oral healthcare.",times:["10:00 AM","12:00 PM","2:30 PM","5:00 PM","7:00 PM"]},
{id:4,name:"Dr. Neha Gupta",specialty:"Pediatrician",city:"Delhi",experience:"12 years",fee:550,rating:4.9,patients:1100,avatar:"👩‍⚕️",about:"Child health consultations and routine pediatric care.",times:["9:00 AM","11:30 AM","1:30 PM","4:00 PM","6:30 PM"]},
{id:5,name:"Dr. Arjun Mehta",specialty:"Orthopedic",city:"Lucknow",experience:"16 years",fee:700,rating:4.8,patients:1450,avatar:"👨‍⚕️",about:"Orthopedic consultations for bones, joints and mobility concerns.",times:["10:30 AM","12:30 PM","3:00 PM","5:30 PM","7:00 PM"]},
{id:6,name:"Dr. Sneha Kapoor",specialty:"General Physician",city:"Delhi",experience:"8 years",fee:350,rating:4.6,patients:650,avatar:"👩‍⚕️",about:"General physician for common health problems and primary care.",times:["9:30 AM","11:00 AM","1:00 PM","4:00 PM","6:00 PM"]},
{id:7,name:"Dr. Rohan Malhotra",specialty:"Ophthalmologist",city:"Lucknow",experience:"13 years",fee:500,rating:4.8,patients:930,avatar:"👨‍⚕️",about:"Eye consultations and routine ophthalmology care.",times:["10:00 AM","12:00 PM","2:00 PM","4:30 PM","6:30 PM"]},
{id:8,name:"Dr. Ananya Mishra",specialty:"Gynecologist",city:"Kanpur",experience:"10 years",fee:600,rating:4.9,patients:980,avatar:"👩‍⚕️",about:"Women's health consultations and routine gynecological care.",times:["9:00 AM","11:00 AM","1:30 PM","4:00 PM","6:00 PM"]},
{id:9,name:"Dr. Vivek Joshi",specialty:"General Physician",city:"Jaipur",experience:"15 years",fee:400,rating:4.7,patients:850,avatar:"👨‍⚕️",about:"Primary care and general health consultations.",times:["10:00 AM","12:00 PM","3:00 PM","5:00 PM"]},
{id:10,name:"Dr. Kavya Rao",specialty:"Dentist",city:"Mumbai",experience:"7 years",fee:450,rating:4.8,patients:590,avatar:"👩‍⚕️",about:"Preventive dentistry and general dental consultations.",times:["9:30 AM","11:30 AM","2:00 PM","5:00 PM"]}
];

const $=s=>document.querySelector(s);
const getRegisteredDoctors=()=>JSON.parse(localStorage.getItem("doctypeDoctors")||"[]");
const saveRegisteredDoctors=list=>localStorage.setItem("doctypeDoctors",JSON.stringify(list));
const allDoctors=()=>[...doctors,...getRegisteredDoctors()];
const getDoctor=id=>allDoctors().find(d=>d.id===Number(id));
const getAppointments=()=>JSON.parse(localStorage.getItem("doctypeAppointments")||"[]");
const saveAppointments=list=>localStorage.setItem("doctypeAppointments",JSON.stringify(list));
const url=(s,c)=>`doctors.html?specialty=${encodeURIComponent(s)}&city=${encodeURIComponent(c)}`;

document.addEventListener("DOMContentLoaded",()=>{
    if(document.body.classList.contains("doctorPortal")) initDoctorDashboard();
    const sf=$("#searchForm");
    if(sf) sf.addEventListener("submit",e=>{
        e.preventDefault();
        const s=$("#specialty").value;
        const c=$("#city").value;
        if(!s||!c){
            if($("#searchMsg")) $("#searchMsg").textContent="Please select both specialty and city.";
            return;
        }
        location.href=url(s,c);
    });

    document.querySelectorAll(".specialties button").forEach(b=>{
        b.addEventListener("click",()=>{
            const s=b.dataset.specialty;
            location.href=url(s,"");
        });
    });

    if($("#doctorGrid")) initDoctors();
    if($("#profile")) initProfile();
    if($("#bookingDoctor")) initBooking();
    if($("#appointments")) showAppointments();
    if($("#joinForm")) initJoinDoctor();
    if($("#doctorLoginForm")) initDoctorLogin();
});

function initJoinDoctor(){
    const form=$("#joinForm");
    form.addEventListener("submit",e=>{
        e.preventDefault();

        const name=$("#doctorName").value.trim();
        const specialty=$("#doctorSpecialty").value;
        const city=$("#doctorCity").value;
        const experience=$("#doctorExperience").value.trim();
        const fee=Number($("#doctorFee").value);
        const phone=$("#doctorPhone").value.trim();
        const email=$("#doctorEmail").value.trim().toLowerCase();
        const password=$("#doctorPassword").value;

        if(!name||!specialty||!city||!experience||!fee||!/^[0-9]{10}$/.test(phone)||!email||password.length<6){
            $("#joinMsg").textContent="Please enter valid details in all fields.";
            return;
        }

        const registered=getRegisteredDoctors();
        if(registered.some(d=>d.email===email)){
            $("#joinMsg").textContent="This email is already registered. Please use Doctor Login.";
            return;
        }

        const doctor={
            id:Date.now(),
            name,specialty,city,experience,fee,phone,email,password,
            rating:"New",patients:0,avatar:"👨‍⚕️",
            about:"Doctor profile registered on DocType.",
            times:["10:00 AM","11:30 AM","1:00 PM","3:30 PM","5:00 PM"],
            verified:false
        };

        registered.push(doctor);
        saveRegisteredDoctors(registered);

        $("#joinMsg").textContent="✓ Registration successful! Your profile is now available in Doctor Search.";
        setTimeout(()=>location.href=`doctor-profile.html?id=${doctor.id}`,900);
    });
}

function initDoctorLogin(){
    const form=$("#doctorLoginForm");
    form.addEventListener("submit",e=>{
        e.preventDefault();

        const email=$("#loginEmail").value.trim().toLowerCase();
        const password=$("#loginPassword").value;
        const doctor=getRegisteredDoctors().find(d=>d.email===email && d.password===password);

        if(!doctor){
            $("#loginMsg").textContent="Invalid email or password. Please register as a doctor first.";
            return;
        }

        localStorage.setItem("doctypeDoctorSession",JSON.stringify({
            id:doctor.id,email:doctor.email,name:doctor.name
        }));

        $("#loginMsg").textContent="✓ Login successful! Opening dashboard...";
        setTimeout(()=>location.href="doctor-dashboard.html",700);
    });
}

function initDoctors(){
    const p=new URLSearchParams(location.search);
    const s=p.get("specialty")||"";
    const c=p.get("city")||"";
    populateSearchOptions();
    if($("#fSpecialty")) $("#fSpecialty").value=s;
    if($("#fCity")) $("#fCity").value=c;
    renderDoctors(s,c);

    $("#apply").addEventListener("click",()=>{
        const a=$("#fSpecialty").value;
        const b=$("#fCity").value;
        location.href=url(a,b);
    });
}

function populateSearchOptions(){
    const registered=getRegisteredDoctors();
    const specialties=[...new Set(registered.map(d=>d.specialty))];
    const cities=[...new Set(registered.map(d=>d.city))];

    const add=(select,values)=>{
        if(!select)return;
        values.forEach(v=>{
            if(![...select.options].some(o=>o.value===v)){
                const o=document.createElement("option");
                o.value=v;o.textContent=v;select.appendChild(o);
            }
        });
    };
    add($("#specialty"),specialties);
    add($("#city"),cities);
    add($("#fSpecialty"),specialties);
    add($("#fCity"),cities);
}

function renderDoctors(s,c){
    const list=allDoctors().filter(d=>(!s||d.specialty===s)&&(!c||d.city===c));
    $("#resultTitle").textContent=s&&c?`${s} doctors in ${c}`:s?`${s} doctors`:c?`Doctors in ${c}`:"Find doctors";
    $("#resultSubtitle").textContent="Compare profiles and choose a convenient appointment.";
    $("#count").textContent=`${list.length} doctor${list.length===1?"":"s"} found`;

    $("#doctorGrid").innerHTML=list.map(d=>`
        <article class="doctorCard">
            <div class="doctorHead">
                <div class="smallAvatar">${d.avatar||"👨‍⚕️"}</div>
                <div>
                    <h3>${d.name}</h3>
                    <div class="specialty">${d.specialty}</div>
                    <div class="verified">${d.verified===false?"Profile submitted":"✓ Verified profile"}</div>
                </div>
            </div>
            <div class="meta">
                <div>Experience<b>${d.experience||"—"}</b></div>
                <div>Fee<b>₹${d.fee||0}</b></div>
                <div>City<b>${d.city}</b></div>
                <div>Rating<b>★ ${d.rating||"New"}</b></div>
            </div>
            <div class="actions">
                <a class="outline" href="doctor-profile.html?id=${d.id}">View Profile</a>
                <a class="btn" href="booking.html?id=${d.id}">Book Appointment</a>
            </div>
        </article>`).join("");

    $("#empty").classList.toggle("hide",list.length>0);
}

function initProfile(){
    const d=getDoctor(new URLSearchParams(location.search).get("id"));
    if(!d){
        $("#profile").innerHTML='<div class="empty">Doctor not found.</div>';
        return;
    }
    $("#profile").innerHTML=`
    <div class="profileCard">
        <div class="profileTop">
            <div class="profileAvatar">${d.avatar||"👨‍⚕️"}</div>
            <div>
                <div class="verified">${d.verified===false?"Profile submitted":"✓ Verified profile"}</div>
                <h1>${d.name}</h1>
                <div class="specialty">${d.specialty} • ${d.city}</div>
            </div>
        </div>
        <div class="profileGrid">
            <div class="info">
                <h3>About the doctor</h3>
                <p>${d.about||"Doctor profile registered on DocType."}</p>
                <p>Experience: <b>${d.experience||"—"}</b> • Patients served: <b>${d.patients||0}+</b></p>
            </div>
            <div class="info">
                <h3>Consultation</h3>
                <p>Fee: <b>₹${d.fee||0}</b></p>
                <p>Rating: <b>★ ${d.rating||"New"}</b></p>
                <p>Location: <b>${d.city}</b></p>
            </div>
        </div>
        <div class="actions" style="margin-top:22px">
            <a class="outline" href="doctors.html">← Back to results</a>
            <a class="btn" href="booking.html?id=${d.id}">Book Appointment →</a>
        </div>
    </div>`;
}

function initBooking(){
    const d=getDoctor(new URLSearchParams(location.search).get("id"));
    if(!d)return;

    $("#bookingDoctor").innerHTML=`
    <div class="bookingDoctor">
        <div class="profileAvatar">${d.avatar}</div>
        <div class="verified">✓ Verified profile</div>
        <h1>${d.name}</h1><div class="specialty">${d.specialty}</div>
        <p>📍 ${d.city}</p><p>Experience: <b>${d.experience}</b></p>
        <p>Consultation fee: <b>₹${d.fee}</b></p><p>Rating: <b>★ ${d.rating}</b></p>
        <a class="outline full" href="doctor-profile.html?id=${d.id}">View Profile</a>
    </div>`;
    $("#paymentFee").textContent=`₹${d.fee}`;

    const dt=$("#date");
    dt.min=new Date().toISOString().split("T")[0];
    dt.value=dt.min;

    renderAvailableTimes(d,dt.value);
    dt.addEventListener("change",()=>renderAvailableTimes(d,dt.value));

    document.querySelectorAll('input[name="paymentMethod"]').forEach(r=>{
        r.addEventListener("change",updatePaymentFields);
    });
    updatePaymentFields();

    $("#bookingForm").addEventListener("submit",e=>{
        e.preventDefault();
        if(!$("#time").value){$("#bookMsg").textContent="Please select a time.";return;}
        if(!$("#patient").value.trim() || !/^[0-9]{10}$/.test($("#phone").value.trim())){
            $("#bookMsg").textContent="Please enter a valid name and 10-digit phone number.";
            return;
        }
        openPaymentModal(d);
    });

    $("#closePayment").addEventListener("click",closePaymentModal);
    $("#payNow").addEventListener("click",()=>completePayment(d));
}

function renderAvailableTimes(d,date){
    const booked=getAppointments().filter(a=>a.doctorId===d.id && a.date===date && a.status==="Confirmed").map(a=>a.time);
    $("#times").innerHTML=d.times.map(t=>{
        const disabled=booked.includes(t);
        return `<button type="button" class="time ${disabled?"disabled":""}" ${disabled?"disabled":""}>${t}${disabled?" • Booked":""}</button>`;
    }).join("");
    $("#time").value="";
    document.querySelectorAll(".time:not(.disabled)").forEach(b=>b.addEventListener("click",()=>{
        document.querySelectorAll(".time").forEach(x=>x.classList.remove("selected"));
        b.classList.add("selected");
        $("#time").value=b.textContent;
    }));
}

function updatePaymentFields(){
    const method=document.querySelector('input[name="paymentMethod"]:checked')?.value;
    $("#upiFields").classList.toggle("hidden",method!=="UPI");
    $("#cardFields").classList.toggle("hidden",method!=="Card");
    $("#demoFields").classList.toggle("hidden",method!=="Demo");
}

function openPaymentModal(d){
    $("#paymentModal").classList.remove("hidden");
    $("#paymentMsg").textContent="";
    $("#modalPaymentText").textContent=`Pay ₹${d.fee} to confirm your appointment with ${d.name}.`;
}

function closePaymentModal(){
    $("#paymentModal").classList.add("hidden");
}

function completePayment(d){
    const method=document.querySelector('input[name="paymentMethod"]:checked')?.value;
    if(method==="UPI" && !$("#upiId").value.trim()){
        $("#paymentMsg").textContent="Please enter a demo UPI ID.";
        return;
    }
    if(method==="Card"){
        const n=$("#cardNumber").value.replace(/\s/g,"");
        if(n.length<12 || $("#expiry").value.trim().length<4 || $("#cvv").value.trim().length<3){
            $("#paymentMsg").textContent="Please enter demo card details.";
            return;
        }
    }

    const appointment={
        id:Date.now(),
        doctorId:d.id,
        doctor:d.name,
        specialty:d.specialty,
        city:d.city,
        patient:$("#patient").value.trim(),
        phone:$("#phone").value.trim(),
        date:$("#date").value,
        time:$("#time").value,
        fee:d.fee,
        paymentMethod:method,
        paymentStatus:"Paid",
        status:"Confirmed",
        bookedAt:new Date().toLocaleString()
    };

    const list=getAppointments();
    list.push(appointment);
    saveAppointments(list);

    $("#paymentMsg").textContent="✓ Payment successful!";
    setTimeout(()=>location.href="appointments.html",700);
}

function showAppointments(){
    const list=getAppointments();
    if(!list.length){
        $("#appointments").innerHTML='<div class="empty">📅<h2>No appointments yet</h2><p>Your booked appointments will appear here.</p></div>';
        return;
    }

    $("#appointments").innerHTML=list.slice().reverse().map(a=>{
        const confirmed=a.status==="Confirmed";
        return `<article class="appointment ${confirmed?"":"cancelledAppointment"}">
            <div>
                <div class="${confirmed?"status":"cancelledStatus"}">${confirmed?"✓ Appointment Confirmed":"✕ Appointment Cancelled"}</div>
                <h3>${a.doctor}</h3>
                <p>${a.specialty} • ${a.city}</p>
                <p>Patient: ${a.patient}</p>
                <p class="paymentPaid">Payment: ${a.paymentStatus||"Not recorded"} ${a.paymentMethod?`(${a.paymentMethod})`:""}</p>
            </div>
            <div class="appointmentRight">
                <b>${a.date}</b><p>${a.time}</p><p>Fee: ₹${a.fee}</p>
                ${confirmed?`<button class="danger smallDanger" data-cancel-id="${a.id}">Cancel Appointment</button>`:"<span class='cancelledText'>Cancelled</span>"}
            </div>
        </article>`;
    }).join("");

    document.querySelectorAll("[data-cancel-id]").forEach(btn=>{
        btn.addEventListener("click",()=>openCancelModal(Number(btn.dataset.cancelId)));
    });
}

let appointmentToCancel=null;

function openCancelModal(id){
    appointmentToCancel=id;
    $("#cancelModal").classList.remove("hidden");
    $("#cancelMsg").textContent="";
}

function closeCancelModal(){
    appointmentToCancel=null;
    $("#cancelModal").classList.add("hidden");
}

if(document.readyState!=="loading"){
    // handled by DOMContentLoaded above
}

document.addEventListener("DOMContentLoaded",()=>{
    if($("#closeCancel")) $("#closeCancel").addEventListener("click",closeCancelModal);
    if($("#keepAppointment")) $("#keepAppointment").addEventListener("click",closeCancelModal);
    if($("#confirmCancel")) $("#confirmCancel").addEventListener("click",()=>{
        if(!appointmentToCancel)return;
        const list=getAppointments();
        const a=list.find(x=>x.id===appointmentToCancel);
        if(a){
            a.status="Cancelled";
            a.cancelledAt=new Date().toLocaleString();
            // In this demo, payment is retained as paid; a real system would apply refund rules.
            saveAppointments(list);
        }
        closeCancelModal();
        showAppointments();
    });
});


function initDoctorDashboard(){
    const session=JSON.parse(localStorage.getItem("doctypeDoctorSession")||"null");
    const registered=getRegisteredDoctors();
    const d=session&&registered.find(x=>x.id===session.id);
    if(!d){location.href="doctor-login.html";return;}

    const esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
    const today=new Date(); const isoToday=today.toISOString().split("T")[0];
    const fmtDate=x=>new Date(x+"T00:00:00").toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});
    const dayName=x=>new Date(x+"T00:00:00").toLocaleDateString("en-IN",{weekday:"long"});
    const getDoctorAppts=()=>getAppointments().filter(a=>Number(a.doctorId)===Number(d.id));
    const getStatus=a=>a.visitStatus||"Confirmed";
    const save=()=>saveAppointments(getAppointments());

    $("#doctorMini").innerHTML=`<span class="miniAvatar">${d.avatar||"👨‍⚕️"}</span><span>${esc(d.name)}</span>`;
    $("#sideProfile").innerHTML=`<div class="sideAvatar">${d.avatar||"👨‍⚕️"}</div><b>${esc(d.name)}</b><small>${esc(d.specialty)}</small><span class="profileLive">● Profile active</span>`;
    $("#todayTop").textContent=today.toLocaleDateString("en-IN",{day:"2-digit",month:"short"});
    $("#welcome").textContent=`Good ${today.getHours()<12?"morning":today.getHours()<17?"afternoon":"evening"}, ${d.name.replace(/^Dr\.\s*/,"")}`;
    $("#todayLabel").textContent=`${dayName(isoToday)}, ${fmtDate(isoToday)}`;
    $("#settingsEmail").textContent=d.email;
    $("#publicProfile").href=`doctor-profile.html?id=${d.id}`;

    function refresh(){
        const list=getDoctorAppts();
        const todayList=list.filter(a=>a.date===isoToday && a.status==="Confirmed");
        const active=todayList.filter(a=>["Checked In","In Consultation"].includes(getStatus(a))).length;
        const upcoming=list.filter(a=>a.status==="Confirmed" && a.date>isoToday).length;
        const earnings=todayList.reduce((n,a)=>n+Number(a.fee||0),0);
        $("#mToday").textContent=todayList.length;
        $("#mTodaySub").textContent=todayList.length?`${todayList.filter(a=>getStatus(a)==="Confirmed").length} confirmed`: "No appointments scheduled";
        $("#mWaiting").textContent=active;
        $("#mUpcoming").textContent=upcoming;
        $("#mEarnings").textContent=`₹${earnings}`;
        $("#sideApptCount").textContent=todayList.length;
        renderToday(todayList);
        renderUpcoming(list);
        renderAppointments("today");
        renderPatients(list);
        renderPayments(list);
        renderAvailability();
    }

    function renderToday(list){
        if(!list.length){$("#todaySchedule").innerHTML='<div class="emptyMini">🎉 No appointments today. Your schedule is clear.</div>';return;}
        const sorted=list.slice().sort((a,b)=>a.time.localeCompare(b.time));
        $("#todaySchedule").innerHTML=sorted.map(a=>appointmentRow(a,true)).join("");
        bindAppointmentActions();
    }

    function appointmentRow(a,full=false){
        const status=getStatus(a);
        const action=status==="Confirmed"?`<button class="queueBtn checkin" data-action="checkin" data-id="${a.id}">Check in</button>`:
            status==="Checked In"?`<button class="queueBtn engage" data-action="engage" data-id="${a.id}">Start consultation</button>`:
            status==="In Consultation"?`<button class="queueBtn complete" data-action="complete" data-id="${a.id}">Complete visit</button>`:
            `<span class="donePill">${esc(status)}</span>`;
        return `<div class="doctorAppt ${status.toLowerCase().replace(/\s/g,"-")}">
          <div class="timeCol"><b>${esc(a.time)}</b><small>${esc(a.date===isoToday?"Today":fmtDate(a.date))}</small></div>
          <div class="patientCol"><div class="patientAvatar">👤</div><div><b>${esc(a.patient)}</b><span>${esc(a.phone)} • ${esc(a.specialty)}</span>${full?`<small>Payment: ${esc(a.paymentStatus||"Paid")} • ₹${esc(a.fee)}</small>`:""}</div></div>
          <div class="visitStatus">${status}</div>
          <div class="rowAction">${action}</div>
        </div>`;
    }

    function renderUpcoming(list){
        const u=list.filter(a=>a.status==="Confirmed"&&a.date>=isoToday).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time)).slice(0,5);
        $("#upcomingList").innerHTML=u.length?u.map(a=>`<div class="compactRow"><b>${fmtDate(a.date)}</b><span>${esc(a.time)}</span><strong>${esc(a.patient)}</strong><small>${esc(a.phone)}</small><em>₹${esc(a.fee)}</em></div>`).join(""):'<div class="emptyMini">No upcoming appointments.</div>';
    }

    let currentFilter="today";
    function renderAppointments(filter){
        currentFilter=filter;
        const list=getDoctorAppts().filter(a=>{
            if(filter==="today")return a.date===isoToday&&a.status==="Confirmed";
            if(filter==="upcoming")return a.date>isoToday&&a.status==="Confirmed";
            if(filter==="cancelled")return a.status==="Cancelled";
            return true;
        }).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
        $("#doctorAppointments").innerHTML=list.length?list.map(a=>appointmentRow(a,true)).join(""):'<div class="empty">📅<h2>No appointments</h2><p>Nothing matches this filter.</p></div>';
        bindAppointmentActions();
    }

    function bindAppointmentActions(){
        document.querySelectorAll("[data-action]").forEach(btn=>btn.onclick=()=>{
            const id=Number(btn.dataset.id); const action=btn.dataset.action;
            const list=getAppointments(); const a=list.find(x=>x.id===id); if(!a)return;
            if(action==="checkin")a.visitStatus="Checked In";
            if(action==="engage")a.visitStatus="In Consultation";
            if(action==="complete"){a.visitStatus="Completed";a.completedAt=new Date().toLocaleString();}
            save(); refresh();
            showNotice(action==="complete"?"Visit marked completed.":"Appointment status updated.");
        });
    }

    function renderPatients(list){
        const q=($("#patientSearch")?.value||"").toLowerCase().trim();
        const map={};
        list.forEach(a=>{if(a.status!=="Cancelled")map[a.phone]={name:a.patient,phone:a.phone,last:a.date,visits:(map[a.phone]?.visits||0)+1,paid:(map[a.phone]?.paid||0)+Number(a.fee||0)}});
        const patients=Object.values(map).filter(p=>!q||p.name.toLowerCase().includes(q)||p.phone.includes(q)).sort((a,b)=>b.last.localeCompare(a.last));
        $("#patientList").innerHTML=patients.length?patients.map(p=>`<div class="patientCard"><div class="patientAvatar large">👤</div><div><h3>${esc(p.name)}</h3><p>${esc(p.phone)}</p><small>Last visit: ${fmtDate(p.last)} • ${p.visits} appointment${p.visits>1?"s":""}</small></div><b>₹${p.paid}</b></div>`).join(""):'<div class="empty">No patients found.</div>';
    }

    function renderPayments(list){
        const paid=list.filter(a=>a.paymentStatus==="Paid"&&a.status!=="Cancelled");
        const total=paid.reduce((n,a)=>n+Number(a.fee||0),0);
        const month=paid.filter(a=>a.date.slice(0,7)===isoToday.slice(0,7)).reduce((n,a)=>n+Number(a.fee||0),0);
        $("#eTotal").textContent=`₹${total}`;$("#eMonth").textContent=`₹${month}`;$("#eVisits").textContent=paid.length;
        $("#paymentHistory").innerHTML=paid.slice().sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time)).slice(0,20).map(a=>`<div class="compactRow"><b>${fmtDate(a.date)}</b><span>${esc(a.time)}</span><strong>${esc(a.patient)}</strong><small>${esc(a.paymentMethod||"Online")}</small><em>₹${esc(a.fee)}</em></div>`).join("")||'<div class="emptyMini">No paid appointments yet.</div>';
    }

    const days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    function defaultAvailability(){
        return JSON.parse(localStorage.getItem("doctypeAvailability_"+d.id)||JSON.stringify(days.map((day,i)=>({day,enabled:i<6,start:"10:00 AM",end:"6:00 PM"}))));
    }
    function renderAvailability(){
        const av=defaultAvailability();
        $("#availabilityGrid").innerHTML=av.map((x,i)=>`<div class="dayAvail"><label class="dayToggle"><input type="checkbox" data-day="${i}" ${x.enabled?"checked":""}><span>${x.day}</span></label><input data-start="${i}" value="${x.start}" ${x.enabled?"":"disabled"}><span>to</span><input data-end="${i}" value="${x.end}" ${x.enabled?"":"disabled"}></div>`).join("");
        document.querySelectorAll(".dayToggle input").forEach(c=>c.onchange=()=>{const i=c.dataset.day;document.querySelector(`[data-start="${i}"]`).disabled=!c.checked;document.querySelector(`[data-end="${i}"]`).disabled=!c.checked;});
    }
    $("#saveSchedule").onclick=()=>{
        const av=days.map((day,i)=>({day,enabled:document.querySelector(`[data-day="${i}"]`).checked,start:document.querySelector(`[data-start="${i}"]`).value,end:document.querySelector(`[data-end="${i}"]`).value}));
        localStorage.setItem("doctypeAvailability_"+d.id,JSON.stringify(av));showNotice("Availability saved successfully.");
    };

    document.querySelectorAll(".sideLink").forEach(b=>b.onclick=()=>switchTab(b.dataset.tab));
    document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>switchTab(b.dataset.go));
    document.querySelectorAll("[data-appt-filter]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-appt-filter]").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderAppointments(b.dataset.apptFilter);});
    $("#patientSearch").oninput=()=>renderPatients(getDoctorAppts());

    function switchTab(tab){
        document.querySelectorAll(".dashTab").forEach(x=>x.classList.remove("active"));
        document.querySelectorAll(".sideLink").forEach(x=>x.classList.remove("active"));
        $("#tab-"+tab).classList.add("active");
        document.querySelector(`.sideLink[data-tab="${tab}"]`).classList.add("active");
        window.scrollTo({top:0,behavior:"smooth"});
    }

    $("#profileForm").onsubmit=e=>{
        e.preventDefault();
        const arr=getRegisteredDoctors();const idx=arr.findIndex(x=>x.id===d.id);if(idx<0)return;
        arr[idx]={...arr[idx],name:$("#editName").value.trim(),specialty:$("#editSpecialty").value,city:$("#editCity").value.trim(),experience:$("#editExperience").value.trim(),fee:Number($("#editFee").value),phone:$("#editPhone").value.trim(),about:$("#editAbout").value.trim()};
        saveRegisteredDoctors(arr);Object.assign(d,arr[idx]);fillProfile();showNotice("Profile updated successfully.");
    };
    function fillProfile(){
        $("#profileName").textContent=d.name;$("#profileAvatar").textContent=d.avatar||"👨‍⚕️";
        $("#editName").value=d.name;$("#editSpecialty").value=d.specialty;$("#editCity").value=d.city;$("#editExperience").value=d.experience;$("#editFee").value=d.fee;$("#editPhone").value=d.phone||"";$("#editAbout").value=d.about||"";
        $("#publicProfile").href=`doctor-profile.html?id=${d.id}`;
        $("#sideProfile").querySelector("b").textContent=d.name;$("#sideProfile").querySelector("small").textContent=d.specialty;
    }
    function showNotice(t){$("#dashNotice").textContent="✓ "+t;$("#dashNotice").classList.remove("hidden");setTimeout(()=>$("#dashNotice").classList.add("hidden"),2500);}
    $("#notifBtn").onclick=()=>showNotice("You have "+getDoctorAppts().filter(a=>a.status==="Confirmed"&&a.date>=isoToday).length+" confirmed appointment(s).");
    $("#logout").onclick=()=>{localStorage.removeItem("doctypeDoctorSession");location.href="doctor-login.html";};
    $("#notifyToggle").onchange=()=>localStorage.setItem("doctypeNotify_"+d.id,$("#notifyToggle").checked);
    $("#onlineToggle").onchange=()=>showNotice($("#onlineToggle").checked?"Online consultation marked available.":"Online consultation marked unavailable.");

    fillProfile();refresh();
}
