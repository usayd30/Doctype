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
