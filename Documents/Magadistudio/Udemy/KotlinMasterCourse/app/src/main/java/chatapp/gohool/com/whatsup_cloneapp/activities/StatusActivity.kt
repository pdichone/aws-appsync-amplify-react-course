package chatapp.gohool.com.whatsup_cloneapp.activities

import android.app.ProgressDialog
import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import chatapp.gohool.com.whatsup_cloneapp.R
import com.google.android.gms.tasks.Task
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.database.*
import kotlinx.android.synthetic.main.activity_account_settings.*
import kotlinx.android.synthetic.main.activity_status.*

class StatusActivity : AppCompatActivity() {
    var mDatabase: DatabaseReference? = null
    var mCurrentUser: FirebaseUser? = null
    var mProgress: ProgressDialog? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_status)

        supportActionBar!!.title = "Status"

        mProgress = ProgressDialog(this)


        if (intent.extras != null) {
            var oldStatus = intent.extras.get("status")
            statusUpdateEt.setText(oldStatus.toString())


        }



        statusUpdateButton.setOnClickListener {
            //we need to show the old status
            mProgress?.setTitle("Saving Status")
            mProgress?.setMessage("Saving Status")
            mProgress?.show()



            mCurrentUser = FirebaseAuth.getInstance().currentUser
            var userId = mCurrentUser?.uid

            mDatabase = FirebaseDatabase.getInstance().reference.child("Users")
                    .child(userId)

            var status = statusUpdateEt.text.toString()
            mDatabase!!.child("user_status").setValue(status).addOnCompleteListener {
                task: Task<Void> ->
                 if (task.isSuccessful) {
                     mProgress?.dismiss()
                     Toast.makeText(this, "Status Updated Successfully!",
                             Toast.LENGTH_LONG).show()

                     startActivity(Intent(this, AccountSettings::class.java))

                 }else {
                     mProgress?.dismiss()

                 }
            }


//            mDatabase!!.addValueEventListener(object : ValueEventListener{
//
//                override fun onDataChange(dataSnapshot: DataSnapshot?) {
//
//
//
//
//
//
//                }
//                override fun onCancelled(databaseError: DatabaseError?) {
//
//                }
//
//
//            })
        }

    }
}
