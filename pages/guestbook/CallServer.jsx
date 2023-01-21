import React from 'react';

export async function getServerSideProps() {
  let { data } = await supabase.from("guestbook").select();
  return {
    props: {
      guestbook: data,
    },
  };
}
