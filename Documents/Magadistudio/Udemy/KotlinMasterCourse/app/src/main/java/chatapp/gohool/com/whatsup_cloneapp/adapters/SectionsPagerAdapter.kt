package chatapp.gohool.com.whatsup_cloneapp.adapters

import android.support.v4.app.Fragment
import android.support.v4.app.FragmentManager
import android.support.v4.app.FragmentPagerAdapter
import chatapp.gohool.com.whatsup_cloneapp.fragments.ChatFragment
import chatapp.gohool.com.whatsup_cloneapp.fragments.FriendsFragment
import chatapp.gohool.com.whatsup_cloneapp.fragments.RequestFragment

/**
 * Created by paulodichone on 7/13/17.
 */
class SectionsPagerAdapter(fm: FragmentManager?) : FragmentPagerAdapter(fm) {
    override fun getItem(position: Int): Fragment {

       when(position) {
            0 -> {

                return RequestFragment() as Fragment
            }
            1 -> {

                return ChatFragment() as Fragment
            }
            2 -> {

                return FriendsFragment() as Fragment
            }

       }
        return null!!
    }

    override fun getCount(): Int {
        return 3

    }

    override fun getPageTitle(postion: Int): CharSequence  {
        when(postion){
            0 -> return "REQUEST"
            1 -> return "CHAT"
            2 -> return "FRIENDS"

        }
        return null!!
    }


}