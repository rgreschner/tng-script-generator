import gpt_2_simple as gpt2

checkpoint_dir = './data/checkpoint'
sess = gpt2.start_tf_sess()
gpt2.load_gpt2(sess, checkpoint_dir=checkpoint_dir)

single_text = gpt2.generate(sess, return_as_list=True, checkpoint_dir=checkpoint_dir)[0]
print('-----BEGIN GENERATED TEXT-----')
print(single_text)
print('-----END GENERATED TEXT-----')
