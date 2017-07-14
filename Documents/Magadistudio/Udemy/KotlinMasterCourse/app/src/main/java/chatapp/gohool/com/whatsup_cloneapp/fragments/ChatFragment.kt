package chatapp.gohool.com.whatsup_cloneapp.fragments


import android.os.Bundle
//import android.app.Fragment
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import chatapp.gohool.com.whatsup_cloneapp.R


/**
 * A simple [Fragment] subclass.
 */
class ChatFragment : Fragment() {

    /*
      In order for this to work, we need to import:
      import android.support.v4.app.Fragment
     */

    override fun onCreateView(inflater: LayoutInflater?, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater!!.inflate(R.layout.fragment_chat, container, false)
    }
//    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
//                              savedInstanceState: Bundle): View? {
//        // Inflate the layout for this fragment
//        return inflater.inflate(R.layout.fragment_chat, container, false)
//    }

}// Required empty public constructor
