> 项目描述
  分别使用纯jquery和纯css两种方式写前端瀑布流布局。布局方式：有一个很长的列表需要渲染，在每个小容器宽度固定情况下，需要把让容器横着排列。第一排按着列表顺序排列，除去第一排的容器，下个容器总是排列在前面已排好的容器中最矮的一列。但要注意的是，每次计算最矮的一列必须要加上该列容器所有的间隙（可能含有margin值）。其实，如果是应用在Vue中是非常好实现的，因为Vue的数据驱动界面给我们带来了很大的便利，我们只需要关注数据层，数据一旦改变，界面也就跟着变了。
