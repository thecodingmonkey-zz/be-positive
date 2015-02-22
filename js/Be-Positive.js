var count = 0;

BloodType = {
  
  AB_POS : "AB_POS",
  AB_NEG : "AB_NEG",
  A_POS  : "A_POS",
  A_NEG  : "A_NEG",
  B_POS  : "B_POS",
  B_NEG  : "B_NEG",
  O_POS  : "O_POS",
  O_NEG  : "O_NEG"

};

BloodTransfusionRules = {
  
  /**
   * Set the simulation speed.
   * @type {Number} : Valid values between 1 and 200
   */
  simulation_speed : 90,

  /**
   * returns BloodType, or false to give no BloodType
   * 
   * @name receive_patient
   * @param {Bank} blood_inventory
   * @param {Patient} patient
   * @returns {BloodType or false}
   *
   * Patient properties {
   *   gender : String, (MALE,FEMALE)
   *   blood_type : String (BloodType)
   * }
   * 
   * Bank properties {
   *   AB_POS : Integer,
   *   AB_NEG : Integer,
   *   A_POS  : Integer,
   *   A_NEG  : Integer,
   *   B_POS  : Integer,
   *   B_NEG  : Integer,
   *   O_POS  : Integer,
   *   O_NEG  : Integer
   * }
   * 
   */

  receive_patient : function (blood_inventory, patient) {
    // console.log('blood_inventory', blood_inventory);
    // console.log('patient', patient);

    var AB_POS = BloodType.AB_POS,
        AB_NEG = BloodType.AB_NEG,
        A_POS = BloodType.AB_POS,
        A_NEG = BloodType.AB_NEG,
        B_POS = BloodType.AB_POS,
        B_NEG = BloodType.AB_NEG,
        O_POS = BloodType.O_POS,
        O_NEG = BloodType.O_NEG;



    var priority = {
      AB_POS: [BloodType.AB_POS, BloodType.A_POS, BloodType.B_POS, BloodType.O_POS, 
                BloodType.AB_NEG, BloodType.A_NEG, BloodType.B_NEG, BloodType.O_NEG],
      AB_NEG: [BloodType.AB_NEG, BloodType.A_NEG, 
                BloodType.B_NEG, BloodType.O_NEG],

      A_POS: [BloodType.A_POS, BloodType.O_POS, BloodType.A_NEG, BloodType.O_NEG],
      A_NEG: [BloodType.A_NEG, BloodType.O_NEG],

      B_POS: [BloodType.B_POS, BloodType.O_POS, BloodType.B_NEG, BloodType.O_NEG],
      B_NEG: [BloodType.B_NEG, BloodType.O_NEG],

      O_POS: [BloodType.O_POS, BloodType.O_NEG],
      O_NEG: [BloodType.O_NEG]

    };

    var list = priority[patient.blood_type];
    var i = 0;

    while (i < list.length) {
      var current_bloodtype = list[i];

      if (blood_inventory[ current_bloodtype ] > 0) {
        count++;
        console.log('Count: ', count);
        return current_bloodtype;
      }

      i++;
    }

    return O_NEG;

    // give a random blood type to anyone
    // very bad idea!
    // return [
    //   BloodType.AB_POS,
    //   BloodType.AB_NEG,
    //   BloodType.A_POS,
    //   BloodType.A_NEG
    // ][Math.floor(Math.random()*4)];

  }

};