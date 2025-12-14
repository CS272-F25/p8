function returnParticipants(){
  if(localStorage.getItem("participants")){
    console.log("participants has been set");
  } else {
    localStorage.setItem("participants", JSON.stringify([
      { name: "Alice Johnson", email: "alice.johnson@wisc.edu", phone: "608-101-0001" },
      { name: "Bob Smith", email: "bob.smith@wisc.edu", phone: "608-102-0002" },
      { name: "Catherine Lee", email: "catherine.lee@wisc.edu", phone: "608-103-0003" },
      { name: "David Kim", email: "david.kim@wisc.edu", phone: "608-104-0004" },
      { name: "Emily Zhang", email: "emily.zhang@wisc.edu", phone: "608-105-0005" },
      { name: "Frank Wilson", email: "frank.wilson@wisc.edu", phone: "608-106-0006" },
      { name: "Grace Liu", email: "grace.liu@wisc.edu", phone: "608-107-0007" },
      { name: "Henry Thompson", email: "henry.thompson@wisc.edu", phone: "608-108-0008" },
      { name: "Isabella Martinez", email: "isabella.martinez@wisc.edu", phone: "608-109-0009" },
      { name: "Jack Davis", email: "jack.davis@wisc.edu", phone: "608-110-0010" },
      { name: "Karen Brown", email: "karen.brown@wisc.edu", phone: "608-111-0011" },
      { name: "Liam Clark", email: "liam.clark@wisc.edu", phone: "608-112-0012" },
      { name: "Mia Allen", email: "mia.allen@wisc.edu", phone: "608-113-0013" },
      { name: "Noah Young", email: "noah.young@wisc.edu", phone: "608-114-0014" },
      { name: "Olivia King", email: "olivia.king@wisc.edu", phone: "608-115-0015" },
      { name: "Paul Wright", email: "paul.wright@wisc.edu", phone: "608-116-0016" },
      { name: "Quinn Scott", email: "quinn.scott@wisc.edu", phone: "608-117-0017" },
      { name: "Rachel Adams", email: "rachel.adams@wisc.edu", phone: "608-118-0018" },
      { name: "Samuel Baker", email: "samuel.baker@wisc.edu", phone: "608-119-0019" },
      { name: "Tina Perez", email: "tina.perez@wisc.edu", phone: "608-120-0020" },
      { name: "Ulysses Rivera", email: "ulysses.rivera@wisc.edu", phone: "608-121-0021" },
      { name: "Victoria Turner", email: "victoria.turner@wisc.edu", phone: "608-122-0022" },
      { name: "William Harris", email: "william.harris@wisc.edu", phone: "608-123-0023" },
      { name: "Xavier Nelson", email: "xavier.nelson@wisc.edu", phone: "608-124-0024" },
      { name: "Yvonne Carter", email: "yvonne.carter@wisc.edu", phone: "608-125-0025" },
      { name: "Zachary Mitchell", email: "zachary.mitchell@wisc.edu", phone: "608-126-0026" },
      { name: "Abigail Reed", email: "abigail.reed@wisc.edu", phone: "608-127-0027" },
      { name: "Benjamin Ward", email: "benjamin.ward@wisc.edu", phone: "608-128-0028" },
      { name: "Charlotte Cooper", email: "charlotte.cooper@wisc.edu", phone: "608-129-0029" },
      { name: "Daniel Bailey", email: "daniel.bailey@wisc.edu", phone: "608-130-0030" }
    ]));}
}