package chatapp.gohool.com.whatsup_cloneapp.activities

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import chatapp.gohool.com.whatsup_cloneapp.R
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.database.*
import kotlinx.android.synthetic.main.activity_account_settings.*
import kotlinx.android.synthetic.main.activity_create_account.*

class AccountSettings : AppCompatActivity() {
    var mDatabase: DatabaseReference? = null
    var mCurrentUser: FirebaseUser? = null


    val  GALLERY_ID: Int = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_account_settings)
        mCurrentUser =FirebaseAuth.getInstance().currentUser
        var userId = mCurrentUser?.uid



        mDatabase = FirebaseDatabase.getInstance().reference.child("Users")
                .child(userId)

        mDatabase!!.addValueEventListener(object : ValueEventListener{

            override fun onDataChange(dataSnapshot: DataSnapshot?) {
                var displayName = dataSnapshot!!.child("display_name").getValue().toString()
                var image = dataSnapshot!!.child("image").getValue().toString()
                var userStatus = dataSnapshot!!.child("user_status").getValue().toString()
                var thumbNail = dataSnapshot!!.child("thumb_image").getValue().toString()

                settingsDisplayName.text = displayName
                settingsStatusText.text = userStatus


            }

            override fun onCancelled(databaseError: DatabaseError?) {

            }



        })


        settingsChangeStatus.setOnClickListener {

            var intent = Intent(this, StatusActivity::class.java)
            var status = settingsStatusText.text.toString()
            intent.putExtra("status", status)

            startActivity(intent)
        }


        settingsProfile.setOnClickListener {

            var galleryIntent = Intent()
            galleryIntent.setType("image/*")
            galleryIntent.setAction(Intent.ACTION_GET_CONTENT)
            startActivityForResult(Intent.createChooser(galleryIntent, "SELECT IMAGE"), GALLERY_ID)
        }


    }
}
